"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CardFooter } from "@/app/components/card";
import { Button } from "@/app/components/button";
import { Field } from "@/app/components/field";
import { signInSocial } from "@/lib/action/auth-action";

const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is too short"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  goal: z.string(),
  acceptedTerms: z.boolean().refine((val) => val === true, {
    message: "Please accept terms",
  }),
});

type RegisterSchema = z.infer<typeof registerSchema>;

async function handleSocialAuth(provider: "github" | "google") {
  await signInSocial(provider);
}

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { goal: "Frontend Developer" },
  });

  const onSubmit = async (data: RegisterSchema) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.fullName, // ត្រូវនឹង Java Field
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const err = await response.json();
        alert(err.message || "Registration failed");
      }
    } catch (error) {
      alert("Cannot connect to Java Server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-slate-950 px-4 py-8 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          {/* Information Section */}
          <section className="rounded-4xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-lg md:p-8">
            <span className="rounded-full bg-indigo-100 dark:bg-indigo-900 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              Join E-Learn
            </span>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
              Create your professional account
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Build your profile and track progress in one place.
            </p>
          </section>

          {/* Registration Form Section */}
          <section className="rounded-4xl bg-slate-900 p-6 text-white shadow-xl md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Create your account</h2>
              <p className="text-sm text-slate-300">
                Start your learning path in minutes.
              </p>
            </div>

            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Full name
                </label>
                <input
                  {...register("fullName")}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none"
                  placeholder="student"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                  placeholder="student@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                  placeholder="Enter your Password"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Goal
                </label>
                <select
                  {...register("goal")}
                  className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Programming Basics">Programming Basics</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    {...register("acceptedTerms")}
                    className="rounded"
                  />
                  I agree to the platform terms.
                </label>
                {errors.acceptedTerms && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.acceptedTerms.message}
                  </p>
                )}
              </div>

              <CardFooter className="flex justify-center p-0 bg-transparent border-none">
                <Field className="flex flex-col gap-3 w-full items-center bg-transparent">
                  {/* Google Sign Up */}
                  <Button
                    onClick={() => handleSocialAuth("google")}
                    variant="outline"
                    type="button"
                    className="w-full max-w-[300px] rounded-2xl border-slate-300 bg-white text-black hover:bg-slate-100 transition-all"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>

                  {/* GitHub Sign Up */}
                  <Button
                    onClick={() => handleSocialAuth("github")}
                    variant="outline"
                    type="button"
                    className="w-full max-w-[300px] rounded-2xl border-slate-300 bg-white text-black hover:bg-slate-100 transition-all"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Continue with GitHub
                  </Button>
                </Field>
              </CardFooter>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-cyan-500 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-all"
                >
                  {isSubmitting ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
