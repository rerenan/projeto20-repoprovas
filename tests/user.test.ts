import dotenv from "dotenv";
import supertest from "supertest";

import client from "../src/config/db";
import app from "../src/app";
import { signUpFactory, userSignInDataFactory, userSignUpDataFactory } from "./factories/userFactory";

dotenv.config();

console.log(`db:${process.env.DATABASE_URL}`)

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`;
  });
  
  afterAll(async () => {
    await client.$disconnect();
  });

describe("Test POST /signup", () => {
    it("Should return status 201, if registered a user in the correct format", async () => {
        const user = userSignUpDataFactory();

        const result = await supertest(app).post("/signup").send(user);

        expect(result.status).toEqual(201);
        expect(result.body).not.toBeNull();
    });
    it("Should return status 409, when trying to register a user that already exists", async () => {
        const user = userSignUpDataFactory();
        
        await supertest(app).post("/signup").send(user);

        const result = await supertest(app).post("/signup").send(user);

        expect(result.status).toEqual(409);
    });
    it("Should return status 422, if body format is invalid", async () => {

        const user = userSignUpDataFactory();
        
        delete user.confirmPassword;

        const result = await supertest(app).post("/signup").send(user);

        expect(result.status).toEqual(422);
    });
        
});

describe("Test POST /signin", () => {
    it("Should return status 200, if logged a user in the correct format and return token",async () => {
        const registeredUser = await signUpFactory();
        const result = await supertest(app).post("/signin").send(registeredUser);

        expect(result.status).toBe(200);
        expect(result.body.token).not.toBeNull();
    });
    it("Should return status 401, if the credentials are wrong", async () => {
        const notRegisteredUser = userSignInDataFactory();

        const result = await supertest(app).post("/signin").send(notRegisteredUser);

        expect(result.status).toBe(401);
    });
    it("Should return status 422, if body format is invalid",async () => {
        const registeredUser = await signUpFactory();

        delete registeredUser.email;

        const result = await supertest(app).post("/signin").send(registeredUser);

        expect(result.status).toBe(422);
    });
});