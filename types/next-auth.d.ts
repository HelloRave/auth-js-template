import "next-auth";
import { type AdapterUser } from "@auth/core/adapters"

declare module "next-auth" {
    interface Session {
        user: {
            role: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string;
    }
}
