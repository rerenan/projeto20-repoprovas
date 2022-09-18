import client from "../config/db";


export async function findById(id: number) {
    const result = await client.teachersDisciplines.findUnique({
        where: {
            id
        }
    });
    return result;
}

export async function findByTeacherId(teacherId: number) {
    const result = await client.teachersDisciplines.findMany({
        where: {
            teacherId
        }
    });
    return result;
}