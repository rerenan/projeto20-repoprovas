import client from "../config/db";
import { TestInsertData } from "../types/Test";

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
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            number: "asc"
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
            id: true,
            name: true,
            tests: {
                select:{
                    id: true,
                    name: true,
                    pdfUrl: true,
                    teacherDicipline: {
                        select: {
                            teacher: {
                                select :{
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            name: "asc"
        }
    })
    return result;
}

export async function getAllTeachers() {
    const result = await client.teachers.findMany({
        select: {
            name: true
        }
    });
    return result;
}

export async function getTestByTeachers(teacher: string) {
    const result = await client.categories.findMany({
        where:{
            tests: {
                some: {
                    teacherDicipline: {
                        teacher: {
                            name: teacher
                        }
                    }
                }
            }
        },
        select: {
            id: true,
            name: true,
            tests: {
                select:{
                    id: true,
                    name: true,
                    pdfUrl: true,
                    teacherDicipline: {
                        select: {
                            discipline: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: {
            name: "asc"
        }
    });
    return result;
}