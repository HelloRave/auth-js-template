import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { getUserById } from "./lib/dbQuery";
import moment from "moment";

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
    ...authConfig.providers,
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
          const { email, password } = credentials;

          const foundUser = await prisma.user.findUnique({
            where: {
              email: email as string,
            },
          });

          if (!foundUser?.password) {
            return null;
          }

          if (foundUser) {
            const passwordMatch = await bcrypt.compare(
              password as string, foundUser.password
            );

            if (passwordMatch) {
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
  events: {
    async linkAccount({ user }) {
      // triggered when an account in a given provider is linked to a user in our user database
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: moment().toDate() },
      });
    }
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const userExist = await getUserById(token.sub);

      if (!userExist) return token;

      token.role = userExist.role;

      console.log({ token });
      return token;
    },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      console.log({
        sessionToken: token,
        session
      })
      return session;
    },
  },
});
