// app/api/tutorials/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = request.headers.get("userId");
  const tutorialId = parseInt(params.id, 10);

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required." },
      { status: 400 }
    );
  }

  try {
    const tutorial = await prisma.tutorial.findUnique({
      where: { id: tutorialId },
      include: {
        links: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!tutorial) {
      return NextResponse.json(
        { error: "Tutorial not found" },
        { status: 404 }
      );
    }

    const userTutorial = await prisma.userTutorial.findUnique({
      where: {
        userId_tutorialId: {
          userId: userId,
          tutorialId: tutorialId,
        },
      },
    });

    const tutorialWithPurchaseStatus = {
      ...tutorial,
      isPurchased: !!userTutorial,
      authorName: tutorial.user.name,
    };

    // Remove sensitive information
    // delete? tutorialWithPurchaseStatus.userId
    // delete? tutorialWithPurchaseStatus.user

    return NextResponse.json(tutorialWithPurchaseStatus);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
