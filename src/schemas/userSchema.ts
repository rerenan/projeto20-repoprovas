import { UserInsertData, UserSignUpData } from '../types/User';
import joi from "joi";

export const signUpSchema = joi.object<UserSignUpData>({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).messages({
        'any.only': "password and confirmPassword they're not the same"
    }).required()
});

export const signInSchema = joi.object<UserInsertData>({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
});