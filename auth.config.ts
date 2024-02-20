import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authConfig = {
    pages: {
        signIn: '',
    },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "Your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        try {
          console.log("credentials login");
          return {
            
          };
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
    GoogleProvider({
      profile(profile) {
        console.log(profile);
        return profile;
      },
    }),
    GitHubProvider({
        profile(profile) {
            console.log(profile);
            return {

            }; 
        }
    })
  ],
} satisfies NextAuthConfig;
