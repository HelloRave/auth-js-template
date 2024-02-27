import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    GoogleProvider,
    GitHubProvider,
  ],
} satisfies NextAuthConfig;
