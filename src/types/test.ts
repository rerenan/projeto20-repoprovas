import { tests as Test } from "@prisma/client";

export type TestInsertData = Omit< Test,"id" | "createdAt" >;