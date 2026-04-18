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

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        level: true,
        track: true,
        mentor: true,
        rating: true,
        learners: true,
        duration: true,
        lessons: true,
        description: true,
      },
    });

    // Format to match frontend expectations
    const formattedCourses = courses.map(course => ({
      ...course,
      id: parseInt(course.id),
      category: course.track,
      price: coursePrices[course.track] ?? '$29',
      image: courseImages[course.track] ?? courseImages['Programming'],
      rating: `${course.rating} ★`,
      learners: `${course.learners} learners`,
    }));

    return Response.json({
      courses: formattedCourses,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
