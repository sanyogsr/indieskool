import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async (data: Omit<AdapterUser, "id"> & { role?: string }) => {
      const { role, ...rest } = data;
      const user = await prisma.user.create({
        data: {
          ...rest,
          role: null,
        },
        // Omit the role field from the creation process
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email as string, // Cast to string since email can’t be null in AdapterUser
        emailVerified: user.emailVerified,
        role: user.role, // This could be null
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      } as AdapterUser;
    },
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};
