import dotenv from "dotenv";

dotenv.config();

console.log(`db:${process.env.DATABASE_URL}`)

describe("Test POST /signup", () => {
    it.todo("Should return status 201, if registered a user in the correct format");
    it.todo("Should return status 409, when trying to register a user that already exists");
    it.todo("Should return status 422, if body format is invalid");

})

describe("Test POST /signin", () => {
    it.todo("Should return status 201, if logged a user in the correct format and return token");
    it.todo("Should return status 401, if the credentials are wrong");
    it.todo("Should return status 404, when trying to login a user that does not exist");
    it.todo("Should return status 422, if body format is invalid");
})