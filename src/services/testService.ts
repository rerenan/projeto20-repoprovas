import { TestReceivedData } from "../types/test";
import * as testRepository from "../repositories/testRepository"
import * as categoryRepository from "../repositories/categoryRepository"
import * as disciplineRepository from "../repositories/disciplineRepository"
import * as teacherRepository from "../repositories/teacherRepository"
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository"
import { notFoundError } from "../utils/errorUtils";

export async function postTest(testData:TestReceivedData) {
    const { 
        name, 
        pdfUrl, 
        category, 
        discipline, 
        teacher 
    } = testData;
    
    const categoryFound = await categoryRepository.findByName(category);
    const disciplineFound = await disciplineRepository.findByName(discipline);
    const teacherFound = await teacherRepository.findByName(teacher);

    if(!categoryFound) throw notFoundError("category");
    if(!disciplineFound) throw notFoundError("discipline");
    if(!teacherFound) throw notFoundError("teacher");

    const teacherDisciplines = await teacherDisciplineRepository.findByTeacherId(teacherFound.id);
    const teacherDiscipline = teacherDisciplines.find((element) => element.disciplineId === disciplineFound.id);
    if(!teacherDiscipline) throw notFoundError("teacher discipline");

    const test = {
        name,
        pdfUrl,
        categoryId: categoryFound.id,
        teacherDisciplineId: teacherDiscipline.id
    }

    const testCreated = await testRepository.insert(test);

    return testCreated;

};

export async function getAllByDisciplines() { 
    const disciplinesByTerms = await testRepository.getDisciplinesByTerms();

    const testsByDisciplines = await Promise.all( disciplinesByTerms.map(async(term)=> {
             const disciplines = await Promise.all(term.disciplines.map(async(discipline)=> {
                const categories = await testRepository.getTestByDiciplines(discipline.name);
                return {
                    name: discipline.name,
                    categories
                }
            }));
            return{
                term: term.number,
                disciplines
            }
        }));
    return testsByDisciplines;
}

export async function getAllByTeachers() { 
    const teachers = await testRepository.getAllTeachers();
    const testsByTeachers = await Promise.all(teachers.map(async(teacher)=>{
        const categories = await testRepository.getTestByTeachers(teacher.name);
        return {
            teacher: teacher.name,
            categories: categories
        }
    }))
    return testsByTeachers;
}