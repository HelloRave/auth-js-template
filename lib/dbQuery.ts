import { prisma } from "./prisma";

export async function getUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({
            where: { email },
        });
    } catch (error) {
        return null;
    }
}

export async function getUserById(id: string) {
    try {
        return await prisma.user.findUnique({
            where: { id },
        });
    } catch (error) {
        return null;
    }
}

export async function getVerificationTokenByEmail (email: string) {
    try {
        return await prisma.verificationToken.findFirst({
            where: { email },
        });
    } catch (error) {
        return null;
    }
}

export async function getVerificationTokenByToken (token: string) {
    try {
        return await prisma.verificationToken.findUnique({
            where: { token },
        });
    } catch (error) {
        return null;
    }
}
