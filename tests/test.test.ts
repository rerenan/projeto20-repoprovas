import dotenv from "dotenv";
import supertest from "supertest";

import client from "../src/config/db";
import app from "../src/app";

dotenv.config();

console.log(`db:${process.env.DATABASE_URL}`)

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users`;
  });
  
  afterAll(async () => {
    await client.$disconnect();
  });

describe("Test POST /test/create", () => {
    it.todo("Shold return status 201, if registered and return test");
    it.todo("Should return status 422, if send test in format invalid")
    it.todo("Should return status 401, if authentication token is invalid")
})
describe("Test GET /test/bydisciplines", () => {
  
    it.todo("Should return status 401, if authentication token is invalid")
})
describe("Test GET /test/byteachers", () => {
    
    it.todo("Should return status 401, if authentication token is invalid")
})