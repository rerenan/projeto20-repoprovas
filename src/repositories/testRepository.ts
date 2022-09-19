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

export async function getDisciplinesByTerms() {
    const result = await client.terms.findMany({
        select: {
            number: true,
            disciplines: {
                select: {
                    name: true
                }
            }
        }
    })
    return result;
}
export async function getTestByDiciplines(discipline: string) {
    const result = await client.categories.findMany({
        where:{
            tests: {
                some: {
                    teacherDicipline: {
                        discipline: {
                            name: discipline
                        }
                    }
                }
            }
        },
        select: {
            name: true,
            tests: {
                select:{
                    name: true,
                    pdfUrl: true,
                    teacherDicipline: {
                        select: {
                            teacher: {
                                select :{
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return result;
}

export async function getAllByTeachers() {
    const result = await client.tests.findMany();
    return result;
}