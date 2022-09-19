import { faker } from "@faker-js/faker";
import client from "../../src/config/db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import generateUserToken from "../../src/utils/generateToken";

dotenv.config();

export function userSignUpDataFactory(){
    
    const password = faker.internet.password();
    return {
        email:faker.internet.email(),
        password,
        confirmPassword: password
    };
};

export function userSignInDataFactory(){
    
    const password = faker.internet.password();
    return {
        email:faker.internet.email(),
        password,
    };
};


export async function signUpFactory(){
    const user = userSignUpDataFactory();
    
    const result = await client.users.create({
        data: {
            email: user.email,
            password: bcrypt.hashSync(user.password,10)
        }
    });
    
    delete user.confirmPassword;
    return user;
};

export async function testDataFactory() {
    
    const categories = await client.categories.findMany();
    const teachersDisciplines = await client.teachersDisciplines.findMany({
        select: {
            teacher: true,
            discipline: true
        }
    })

    const arrayCategories = categories.map ((category)=> category.name);
    const arrayTeachersDisciplines = teachersDisciplines.map((teacherDisc)=> [teacherDisc.discipline.name, teacherDisc.teacher.name]);
    const randomTeacherDisciplines = faker.helpers.arrayElement(arrayTeachersDisciplines);
    return {
        name: faker.random.words(3),
        pdfUrl: faker.internet.url(),
        category: faker.helpers.arrayElement(arrayCategories),
        discipline: randomTeacherDisciplines[0],
        teacher: randomTeacherDisciplines[1]
    }
}

export async function signInFactory(){
    const user = userSignUpDataFactory();
    
    const result = await client.users.create({
        data: {
            email: user.email,
            password: bcrypt.hashSync(user.password,10)
        }
    });
    
    const token = generateUserToken(result.id);

    return token;
    
};

export function fakeTokenFactory(){
    return faker.datatype.uuid()
}