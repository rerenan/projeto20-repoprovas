import joi from "joi";

export const testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    category: joi.valid("P1", "P2", "P3", "P2ch", "Outras").required(),
    discipline: joi.string().required(),
    teacher: joi.string().required()
});
