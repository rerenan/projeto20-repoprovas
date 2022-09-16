import bcrypt from 'bcrypt';

import * as userRepository from "../repositories/userRepository"
import { UserInsertData, UserSignUpData } from "../types/User";
import generateUserToken from '../utils/generateToken';

export async function createUser(userData:UserSignUpData) {
    const {email, password, confirmPassword} = userData;

    if(password !== confirmPassword) throw {type: "unprocessableEntity", message: "password and confirmPassword they're not the same"}

    const user = await userRepository.findUserByEmail(email);
    if(user) throw {type: "conflict", message: "This email already used."};

    const passwordHash = bcrypt.hashSync(password, 10);

    await userRepository.insert({email, password: passwordHash});
    
    return;

};

export async function login(userData:UserInsertData) {
    const {email, password} = userData;
    
    const user = await userRepository.findUserByEmail(email);
    if(!user) throw {type: "unauthorized", message: "Email or password incorrect"};

    const validatePassword = bcrypt.compareSync(password, user.password);
    if(!validatePassword) throw {type: "unauthorized", message: "Email or password incorrect"};

    const token = generateUserToken(user.id);
    
    return token;
};
