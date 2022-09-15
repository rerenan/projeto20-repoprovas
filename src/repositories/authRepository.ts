import client from "../config/db";
import { UserInsertData } from "../types/User";

export async function insert(userData: UserInsertData) {
    const {email, password } = userData;

    await client.users.create({
        data: {
            email,
            password
        }
    });
    return;
};

export async function findUserByEmail(email:string) {
    const result = await client.users.findUnique({
        where: {
            email
        }
    });
    return result;
}