import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const courseImages: Record<string, string> = {
  Programming:
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  Frontend:
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
  'Full Stack':
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'Web Basics':
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
};

const coursePrices: Record<string, string> = {
  Programming: 'Free',
  Frontend: '$29',
  'Full Stack': '$39',
  'Web Basics': 'Free',
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        courseLessons: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!course) {
      return Response.json({ message: "Course not found" }, { status: 404 });
    }

    // Format to match frontend
    const formattedCourse = {
      id: parseInt(course.id),
      title: course.title,
      level: course.level,
      category: course.track,
      track: course.track,
      price: coursePrices[course.track] ?? '$29',
      image: courseImages[course.track] ?? courseImages['Programming'],
      mentor: course.mentor,
      rating: `${course.rating} ★`,
      learners: `${course.learners} learners`,
      duration: course.duration,
      lessons: course.lessons,
      description: course.description,
      outcomes: JSON.parse(course.outcomes),
      curriculum: JSON.parse(course.curriculum),
      lessonItems: course.courseLessons.map(lesson => ({
        id: parseInt(lesson.id.split('-')[1]), // Extract original id
        title: lesson.title,
        duration: `${lesson.duration} min`,
        completed: false, // Default, will be per user later
        summary: lesson.content,
      })),
    };

    return Response.json({ course: formattedCourse });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}
