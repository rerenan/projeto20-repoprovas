import { users as User } from "@prisma/client";

export type UserInsertData = Omit<User, "id" | "createdAt">;

export interface UserSignUpData {
    email: string,
    password: string,
    confirmPassword: string
};