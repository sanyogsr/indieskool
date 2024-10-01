import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
    httpClient: Stripe.createFetchHttpClient(),
    typescript: true,
  });
  try {
    const { tutorialId, userId } = await req.json();

    // Fetch the tutorial and its owner (admin) details
    const tutorial = await prisma.tutorial.findUnique({
      where: { id: tutorialId },
      select: {
        price: true,
        title: true,
        user: {
          select: {
            stripeAccount: {
              select: { stripeAccountId: true },
            },
          },
        },
      },
    });

    if (!tutorial || !tutorial.user.stripeAccount) {
      return NextResponse.json(
        { error: "Tutorial not found or admin Stripe account not set up" },
        { status: 404 }
      );
    }

    const adminStripeAccountId = tutorial.user.stripeAccount.stripeAccountId;

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tutorial.title,
            },
            unit_amount: tutorial.price * 100, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/search`,
      payment_intent_data: {
        application_fee_amount: Math.round(tutorial.price * 100 * 0.1), // 10% platform fee
        transfer_data: {
          destination: adminStripeAccountId,
        },
      },
      metadata: {
        tutorialId: tutorialId.toString(),
        userId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
