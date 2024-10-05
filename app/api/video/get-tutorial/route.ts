import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
// get tutorials
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const userEmail = session.user.email;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const getTut = await prisma.tutorial.findMany({
      where: { userId: user.id },
      include: { links: true },
    });
    return NextResponse.json(getTut);
  } catch (error) {
    console.error("error in getting tutorials", error);
    return NextResponse.json(
      { error: "Failded to get tutorials please try again" },
      { status: 500 }
    );
  }
}


