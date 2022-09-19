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

export async function getAllByDisciplines() {
    const result = await client.terms.findMany({
        
        orderBy:{
            number: "asc"
        },
        select: {
            number: true,
            disciplines: {
                select :{
                    name: true,
                    teachersDisciplines:{
                        select:{
                                tests:{
                                    select: {
                                        name: true,
                                        pdfUrl: true,
                                        category: {
                                            select: {
                                                name: true
                                            }
                                        },
                                        teacherDicipline: {
                                            select: {
                                                teacher: {
                                                    select: {
                                                        name: true
                                                    }
                                                }
                                            }
                                        }
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