import { faker } from '@faker-js/faker';

export function userSignUpFactory(){
    
    const password = faker.internet.password();
    return {
        email:faker.internet.email(),
        password,
        confirmPassword: password
    };
};

export function userSignInFactory(){
    return {
        email:faker.internet.email(),
        password: faker.internet.password()
    };
};