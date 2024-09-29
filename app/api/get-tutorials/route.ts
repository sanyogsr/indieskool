// app/api/tutorials/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Adjust the import path according to your structure

export async function GET(request: Request) {
  const userId = request.headers.get("userId"); // Get the user ID from the headers or replace with appropriate auth mechanism

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required." },
      { status: 400 }
    );
  }

  try {
    // Fetch all tutorials
    const tutorials = await prisma.tutorial.findMany();

    // Fetch purchased tutorials for the user
    const purchasedTutorials = await prisma.userTutorial.findMany({
      where: {
        userId: userId,
      },
      select: {
        tutorialId: true,
      },
    });

    const purchasedIds = purchasedTutorials.map((t) => t.tutorialId);

    // Map tutorials to include purchase status
    const tutorialsWithPurchaseStatus = tutorials.map((tutorial) => ({
      ...tutorial,
      isPurchased: purchasedIds.includes(tutorial.id),
      price: tutorial.price || 0, // Assuming there's a price field; if not, adjust accordingly
    }));

    return NextResponse.json(tutorialsWithPurchaseStatus);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
