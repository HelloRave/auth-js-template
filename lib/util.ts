import moment from "moment";
import { v4 as uuid } from "uuid";
import { getVerificationTokenByEmail } from "./dbQuery";
import { prisma } from "./prisma";

export async function generateVerificationToken(email: string) {
    const token = uuid();
    const expires = moment().add(1, 'h').toDate();

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    return await prisma.verificationToken.create({
        data: {
            email, token, expires
        },
    });
}