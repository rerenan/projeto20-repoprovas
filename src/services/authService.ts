import bcrypt from 'bcrypt';

import * as authRepository from "../repositories/authRepository"
import { UserInsertData, UserSignUpData } from "../types/User";

export async function createUser(userData:UserSignUpData) {
    const {email, password, confirmPassword} = userData;

};

export async function login(userData:UserInsertData) {
    const {email, password} = userData;
    
};
