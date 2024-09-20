import { PrismaClient } from "@prisma/client";

const prismaClientSingleTon = () => {
  return new PrismaClient();
};

// Initialize the Prisma client, using 'const'
const prisma = globalThis.prisma ?? prismaClientSingleTon();
export default prisma;

// Assign the prisma client to the global variable in development mode
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
