import { signUpSchema, signInSchema } from './../schemas/authSchema';
import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/authController";
import validateSchema from "../middlewares/validateSchemaMiddleware";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUpUser);
authRouter.post("/signin", validateSchema(signInSchema), signInUser);

export default authRouter;