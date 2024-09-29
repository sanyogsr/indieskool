import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Stripe from "stripe";
import prisma from "@/lib/db"; // Assuming you have Prisma configured
import { authOptions } from "@/lib/auth"; // Adjust according to your auth configuration

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20" as const, // Check Stripe API version
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch user from the database to get the role
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true, role: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if the user already has a Stripe account
  const existingStripeAccount = await prisma.stripeAccount.findUnique({
    where: { userId: user.id },
  });

  if (existingStripeAccount) {
    return NextResponse.json({ message: "Stripe account already exists" });
  }

  // Create Stripe account
  const account = await stripe.accounts.create({
    type: "express", // or 'standard' based on your requirements
    email: user.email!,
  });

  // Store Stripe account in the database
  await prisma.stripeAccount.create({
    data: {
      userId: user.id,
      stripeAccountId: account.id,
      connected: false, // Mark connected once verified
    },
  });
  const refreshUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile`;
  const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/profile`;
  console.log("Refresh URL:", refreshUrl);
  console.log("Return URL:", returnUrl);
  // Send Stripe account URL to complete the onboarding
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}
