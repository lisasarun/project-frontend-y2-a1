"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/app/components/button";
import { Field } from "@/app/components/field";
import { CardFooter } from "@/app/components/card";
import { signInSocial } from "@/lib/action/auth-action";

function formatDemoName(email: string) {
  const baseName = email.split("@")[0] || "Student";
  return baseName
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function LoginPage() {
  // Login page will use system dark mode from layout
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user
        localStorage.setItem('elearn-token', data.token);
        localStorage.setItem('elearn-user', JSON.stringify(data.user));
        window.dispatchEvent(new Event("elearn-auth-changed"));
        router.push("/dashboard");
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialAuth = async (provider: "github" | "google") => {
    await signInSocial(provider);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-8 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section className="rounded-4xl bg-linear-to-r from-slate-950 via-indigo-900 to-cyan-600 p-6 text-white shadow-xl md:p-8">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-cyan-100">
              Student login
            </span>

            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Continue your learning journey with confidence
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-100 md:text-base">
              Sign in to access your dashboard, continue your courses, and track
              your certificates in a professional e-learning workspace.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">24/7</p>
                <p className="mt-1 text-sm text-slate-200">learning access</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">120+</p>
                <p className="mt-1 text-sm text-slate-200">guided lessons</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">4.8/5</p>
                <p className="mt-1 text-sm text-slate-200">learner rating</p>
              </div>
            </div>
          </section>

          <section className="rounded-4xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm dark:shadow-lg md:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Welcome back</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Login to your account</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Access your saved progress and continue learning.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-indigo-500 dark:focus:border-indigo-400"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-indigo-500 dark:focus:border-indigo-400"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <span className="font-medium text-indigo-600 dark:text-indigo-400">Forgot password?</span>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 dark:bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:hover:bg-indigo-700"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Or continue with</span>
              <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700"></div>
            </div>

            <CardFooter className="flex justify-center p-0 bg-transparent border-none mt-6">
              <Field className="flex flex-col gap-3 w-full items-center bg-transparent">
                {/* Google Login */}
                <Button
                  onClick={() => handleSocialAuth("google")}
                  variant="outline"
                  type="button"
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-medium"
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

                {/* GitHub Login */}
                <Button
                  onClick={() => handleSocialAuth("github")}
                  variant="outline"
                  type="button"
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-medium"
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

            <div className="mt-6 rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 text-sm text-slate-600 dark:text-slate-300">
              Demo access: use any email and password for UI preview.
            </div>

            <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                Create one
              </Link>
            </p>
          </section>
        </div>
    </main>
  );
}
