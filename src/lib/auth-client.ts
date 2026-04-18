import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const signInWithProvider = async (provider: "github" | "google") => {
  return await authClient.signIn.social({
    provider,
    callbackURL: "/dashboard",
  });
};