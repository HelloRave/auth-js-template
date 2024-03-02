"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/dbQuery";
import { generateVerificationToken } from "@/lib/util";
import { AuthError } from "next-auth";

export type TLoginSchema = {
    email: string;
    password: string;
};

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    const email = formData.get('email');
    const password = formData.get('password');

    const existingUser = await getUserByEmail((email as string));

    if (!existingUser?.emailVerified) {
        const verificationToken = await generateVerificationToken((email as string));

        // return 'Confirmation email sent';
    }

    try {
        await signIn("credentials", {
            email, password, redirectTo: '/',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
