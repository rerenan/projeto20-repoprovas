import dotenv from "dotenv";
import supertest from "supertest";

import client from "../src/config/db";
import app from "../src/app";
import { signInFactory, testDataFactory } from "./factories/userFactory";

dotenv.config();

console.log(`db:${process.env.DATABASE_URL}`)

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`;
  });
  
  afterAll(async () => {
    await client.$disconnect();
  });

describe("Test POST /test/create", () => {
    it("Shold return status 201, if registered and return test", async () => {
        
        const test = await testDataFactory();
        console.log(test)
        const token = await signInFactory();

        const result = await supertest(app).post("/test/create").send(test).set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(201);
        expect(result.body).not.toBeNull();
    });
    it.todo("Should return status 401, if authentication token is invalid");
    it.todo("Should return status 404, if fields relations is incompatible");
    it.todo("Should return status 422, if send test in format invalid");
})
describe("Test GET /test/bydisciplines", () => {
  
    it.todo("Should return status 401, if authentication token is invalid");
})
describe("Test GET /test/byteachers", () => {
    
    it.todo("Should return status 401, if authentication token is invalid");
})