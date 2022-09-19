import { TestReceivedData } from "../../types/Test";

import joi from "joi";

export const testSchema = joi.object<TestReceivedData>({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    category: joi.valid("Projeto", "Prática", "Recuperação").required(),
    discipline: joi.string().required(),
    teacher: joi.string().required()
});
