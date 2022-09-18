import * as testRepository from "../repositories/testRepository"
import { TestReceivedData } from "../types/test";


export async function postTest(testData:TestReceivedData) {
    const { 
        name, 
        pdfUrl, 
        category, 
        discipline, 
        teacher 
    } = testData;
    
};