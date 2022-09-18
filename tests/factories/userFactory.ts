import { faker } from "@faker-js/faker";
import client from "../../src/config/db";
import bcrypt from "bcrypt";

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