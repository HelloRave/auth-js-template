"use server"

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { TSignupSchema, signUpSchema } from "@/lib/schema";

export async function registerUser(data: TSignupSchema) {
    const result = signUpSchema.safeParse(data);

    if (!result.success) {
        return { sucess: false, error: result.error.format() };
    }

    const duplicate = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    });

    if (duplicate) {
        return { success: false, error: { message: "Duplicate email" }}
    }

    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            }
        });
        return { success: true, message: "User created" };
    } catch (error) {
        console.log(error)
        return { sucess: false };
    }
}