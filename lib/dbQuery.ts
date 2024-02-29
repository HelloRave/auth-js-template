import { prisma } from "./prisma";

export async function getUserById(id: string) {
    try {
        return await prisma.user.findUnique({
            where: { id },
        });
    } catch (error) {
        return null;
    }
}