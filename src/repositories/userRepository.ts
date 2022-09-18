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

export async function findByEmail(email: string) {
    const result = await client.users.findUnique({
        where: {
            email
        }
    });
    return result;
}


export async function findById(id: number) {
    const result = await client.users.findUnique({
        where: {
            id
        }
    });
    return result;
}