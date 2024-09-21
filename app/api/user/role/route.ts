import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { userId, role } = body;
    console.log(role);

    if (!role) {
      return NextResponse.json({ error: "Missing role" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: role },
    });

    return NextResponse.json(
      { message: "Role Updated Successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error); // Log the error
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 }
    );
  }
}
