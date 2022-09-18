import client from "../config/db";
import { TestInsertData } from "../types/test";

export async function insert(testData: TestInsertData) {

    return await client.tests.create({
        data: {
            ...testData
        }
    });
};

export async function findById(id: number) {
    const result = await client.tests.findUnique({
        where: {
            id
        }
    });
    return result;
}