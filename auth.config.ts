import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    GoogleProvider({
      profile(profile) {
        console.log(profile);
        return profile;
      },
    }),
    GitHubProvider({
      profile(profile) {
        console.log(profile);
        return {};
      },
    }),
  ],
} satisfies NextAuthConfig;
