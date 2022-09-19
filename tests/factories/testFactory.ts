import { faker } from "@faker-js/faker";
import client from "../../src/config/db";

export async function testDataFactory() {

    const categories = await client.categories.findMany();
    const teachersDisciplines = await client.teachersDisciplines.findMany({
        select: {
            teacher: true,
            discipline: true
        }
    })

    const arrayCategories = categories.map((category) => category.name);
    const arrayTeachersDisciplines = teachersDisciplines.map((teacherDisc) => [teacherDisc.discipline.name, teacherDisc.teacher.name]);
    const randomTeacherDisciplines = faker.helpers.arrayElement(arrayTeachersDisciplines);
    return {
        name: faker.random.words(3),
        pdfUrl: faker.internet.url(),
        category: faker.helpers.arrayElement(arrayCategories),
        discipline: randomTeacherDisciplines[0],
        teacher: randomTeacherDisciplines[1]
    }
}



export async function fakeTestData() {
    if (faker.datatype.boolean()) {
        const categories = await client.categories.findMany();
        const teacher = await client.teachers.findUnique({
            where: {
                id: 1
            }
        });
        const disciplines = await client.disciplines.findMany({
            where: {
                NOT: {
                    teachersDisciplines: {
                        some: {
                            teacherId: 1
                        }
                    }
                }
            }
        })
        const arrayDisciplines = disciplines.map((discipline) => discipline.name)
        const arrayCategories = categories.map((category) => category.name);
        return {
            name: faker.random.words(3),
            pdfUrl: faker.internet.url(),
            category: faker.helpers.arrayElement(arrayCategories),
            discipline: faker.helpers.arrayElement(arrayDisciplines),
            teacher: teacher.name
        }
    } else {
        const categories = await client.categories.findMany();
        const discipline = await client.disciplines.findUnique({
            where: {
                id: 1
            }
        });
        const teachers = await client.teachers.findMany({
            where: {
                NOT: {
                    teachersDisciplines: {
                        some: {
                            disciplineId: 1
                        }
                    }
                }
            }
        })
        const arrayTeachers = teachers.map((teacher) => teacher.name)
        const arrayCategories = categories.map((category) => category.name);
        return {
            name: faker.random.words(3),
            pdfUrl: faker.internet.url(),
            category: faker.helpers.arrayElement(arrayCategories),
            discipline: discipline.name,
            teacher: faker.helpers.arrayElement(arrayTeachers),
        }
    }
}