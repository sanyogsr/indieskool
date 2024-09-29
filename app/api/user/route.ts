import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        stripeAccount: {
          select: {
            id: true, // Adjust according to the specific field to check existence
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Only return `true` if a stripeAccount exists, `false` otherwise
    const hasStripeAccount = !!user.stripeAccount; // Convert to boolean

    // Return user data, including whether the user has a Stripe account
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasStripeAccount, // Return true or false based on Stripe account existence
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user data" },
      { status: 500 }
    );
  }
}
