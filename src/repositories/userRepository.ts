import client from "../config/db";
import { UserInsertData } from "../types/user";

export async function insert(userData: UserInsertData) {
    const {email, password } = userData;

    return await client.users.create({
        data: {
            email,
            password
        }
    });
};

export async function findUserByEmail(email:string) {
    const result = await client.users.findUnique({
        where: {
            email
        }
    });
    return result;
}