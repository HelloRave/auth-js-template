import { z } from "zod";

export const signUpSchema = z.object({
    name: z.string().min(3, 'Name at least 3 characters'),
    email: z.string().email(),
    password: z.string().min(6, 'Password at least 6 characters'),
    confirmPassword: z.string(),
}).refine(
    (data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    }
)

export type TSignupSchema = z.infer<typeof signUpSchema>;