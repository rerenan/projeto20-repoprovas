import client from "../src/config/db";

async function seed() {
    const terms = [1,2,3,4,5,6];
    const categories = ["Projeto", "Prática", "Recuperação"];
    const teachers = ["Diego Pinho", "Bruna Hamori"];
    const disciplines = [
        {name: "HTML e CSS", termId: 1},
        {name: "JavaScript", termId: 2},
        {name: "React", termId: 3},
        {name: "Humildade", termId: 1},
        {name: "Planejamento", termId: 2},
        {name: "Autoconfiança", termId: 3},
    ];
    const teachersDisciplines = [
        {teacherId: 1, disciplineId: 1},
        {teacherId: 1, disciplineId: 2},
        {teacherId: 1, disciplineId: 3},
        {teacherId: 2, disciplineId: 4},
        {teacherId: 2, disciplineId: 5},
        {teacherId: 2, disciplineId: 6},
    ]

    await client.$transaction(
        terms.map((term)=> client.terms.upsert({
            where: {
                number: term
            },
            update: {},
            create: {
                number: term
            }
        }))
    )

    await client.$transaction(
        categories.map((category)=> client.categories.upsert({
            where: {
                name: category
            },
            update: {},
            create: {
                name: category
            }
        }))
    )

    await client.$transaction(
        teachers.map((teacher)=> client.teachers.upsert({
            where: {
                name: teacher
            },
            update: {},
            create: {
                name: teacher
            }
        }))
    )
    await client.$transaction(
        disciplines.map((discipline)=> client.disciplines.upsert({
            where: {
                name: discipline.name
            },
            update: {},
            create: {
                name: discipline.name,
                termId: discipline.termId
            }
        }))
    )

    await client.$transaction(
        teachersDisciplines.map((teacherDiscipline)=> client.teachersDisciplines.upsert({
            where: {
                teacher_discipline: teacherDiscipline
            },
            update: {},
            create: teacherDiscipline
        }))
    )
    
}



seed()
    .finally(()=>{
        client.$disconnect();
    })