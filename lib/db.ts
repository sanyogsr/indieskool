import { PrismaClient } from "@prisma/client";

const prismaClientSingleTon = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleTon>;
}

const prisma = globalThis.prisma ?? prismaClientSingleTon();
export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
