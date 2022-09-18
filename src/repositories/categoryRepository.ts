import client from "../config/db";


export async function findById(id: number) {
    const result = await client.categories.findUnique({
        where: {
            id
        }
    });
    return result;
}