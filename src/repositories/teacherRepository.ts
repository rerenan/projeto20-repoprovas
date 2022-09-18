import client from "../config/db";


export async function findById(id: number) {
    const result = await client.teachers.findUnique({
        where: {
            id
        }
    });
    return result;
}