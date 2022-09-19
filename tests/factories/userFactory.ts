import { faker } from "@faker-js/faker";
import client from "../../src/config/db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import generateUserToken from "../../src/utils/generateToken";

dotenv.config();

export function userSignUpDataFactory() {

    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        password,
        confirmPassword: password
    };
};

export function userSignInDataFactory() {

    const password = faker.internet.password();
    return {
        email: faker.internet.email(),
        password,
    };
};


export async function signUpFactory() {
    const user = userSignUpDataFactory();

    const result = await client.users.create({
        data: {
            email: user.email,
            password: bcrypt.hashSync(user.password, 10)
        }
    });

    delete user.confirmPassword;
    return user;
};


export async function signInFactory() {
    const user = userSignUpDataFactory();

    const result = await client.users.create({
        data: {
            email: user.email,
            password: bcrypt.hashSync(user.password, 10)
        }
    });

    const token = generateUserToken(result.id);

    return token;

};

export function fakeTokenFactory() {
    return faker.datatype.uuid()
};