import { tests as Test } from "@prisma/client";

export type TestInsertData = Omit< Test,"id" | "createdAt" >;

export interface TestReceivedData {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
}