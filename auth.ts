import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  ...authConfig,
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
          const foundUser = await prisma.user.findUnique({
            where: {
              email: credentials?.email as string,
            },
          });
          if (foundUser) {
            console.log("User exist");
            const passwordMatch = await bcrypt.compare(
              credentials?.password as string,
              foundUser.password!
            );

            if (passwordMatch) {
              console.log("Good match");
              return {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
              };
            }
          }
        } catch (error) {
          console.log("error", error);
        }
        return null;
      },
    }),
  ],
});
