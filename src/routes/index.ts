import {Router} from "express";
import tokenMiddleware from "../middlewares/tokenMiddleware";
import testRouter from "./testRouter";
import userRouter from "./userRouter";

const router = Router();

router.use(userRouter);
router.use("/test",tokenMiddleware, testRouter);

export default router;