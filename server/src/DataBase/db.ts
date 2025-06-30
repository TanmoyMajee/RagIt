import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient({
  log : [ 'query'],
});
export default prisma;