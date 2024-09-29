import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tutorialId = parseInt(params.id);

    if (isNaN(tutorialId)) {
      return NextResponse.json(
        { error: "Invalid tutorial ID" },
        { status: 400 }
      );
    }

    const tutorial = await prisma.tutorial.findUnique({
      where: { id: tutorialId },
      include: {
        user: {
          select: {
            stripeAccount: {
              select: { stripeAccountId: true },
            },
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

    // Restructure the data to include the Stripe account ID directly
    const { user, ...tutorialWithoutUser } = tutorial; // Destructure user here

    const tutorialWithStripeAccount = {
      ...tutorialWithoutUser,
      ownerStripeAccountId:
        tutorial.user.stripeAccount?.stripeAccountId || null,
    };

    return NextResponse.json(tutorialWithStripeAccount);
  } catch (error) {
    console.error("Error fetching tutorial:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
