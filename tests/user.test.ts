import dotenv from "dotenv";
import supertest from "supertest";

import client from "../src/config/db";
import app from "../src/app";
import { userSignInFactory, userSignUpFactory } from "./factories/userFactory";

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
        const user = userSignUpFactory();

        const result = await supertest(app).post("/signup").send(user);

        expect(result.status).toEqual(201);
        expect(result.body).not.toBeNull();
    });
    it("Should return status 409, when trying to register a user that already exists", async () => {
        const user = userSignUpFactory();
        
        await supertest(app).post("/signup").send(user);

        const result = await supertest(app).post("/signup").send(user);

        expect(result.status).toEqual(409);
    });
    it.todo("Should return status 422, if body format is invalid");

})

describe("Test POST /signin", () => {
    it.todo("Should return status 201, if logged a user in the correct format and return token");
    it.todo("Should return status 401, if the credentials are wrong");
    it.todo("Should return status 404, when trying to login a user that does not exist");
    it.todo("Should return status 422, if body format is invalid");
})