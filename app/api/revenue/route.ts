import prisma from "@/lib/db"; // Adjust this import according to your setup
import { getServerSession } from "next-auth"; // Use getServerSession for the app router
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"; // Adjust according to your next-auth config

// Add this to ensure Next.js doesn't try to statically render this page
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user from the database based on email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        role: true,
        stripeAccount: { select: { stripeAccountId: true } },
      },
    });

    // If no user is found, return a 404 error
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the user is an ADMIN
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the Stripe account ID for the admin
    const stripeAccountId = user.stripeAccount?.stripeAccountId;
    console.log(stripeAccountId);
    // Fetch total payments for the admin based on their Stripe account ID
    const payments = await prisma.payment.findMany({
      where: {
        stripePaymentId: stripeAccountId, // Use the actual account ID here
      },
      select: {
        amount: true,
      },
    });

    console.log("Payments related to the Stripe Account:", payments);
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        user: {
          stripeAccount: {
            stripeAccountId: stripeAccountId, // Use the fetched Stripe account ID
          },
        },
        status: "COMPLETED", // Ensure you only sum completed payments
      },
      _sum: {
        amount: true, // Sum the amount field to get total revenue
      },
    });

    // Handle the case where no payments are found
    const totalAmount = totalRevenue._sum.amount || 0;
    console.log(totalAmount);
    console.log(totalRevenue);
    // Return the total revenue
    return NextResponse.json({ totalAmount });
  } catch (error) {
    console.error("Failed to fetch revenue", error);
    return NextResponse.json(
      { message: "Failed to fetch revenue" },
      { status: 500 }
    );
  }
}
