// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";
// import Stripe from "stripe";
// import { mapStripePaymentStatus } from '@/utils/paymentStatusMapping'; // Adjust the import based on your project structure

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-06-20",
// });

// export async function POST(req: Request) {
//   const { sessionId } = await req.json();

//   // Retrieve the Stripe session
//   const session = await stripe.checkout.sessions.retrieve(sessionId);

//   const { tutorialId, userId } = session.metadata!;

//   // Create a UserTutorial record
//   const userTutorial = await prisma.userTutorial.create({
//     data: {
//       userId,
//       tutorialId: Number(tutorialId),
//       purchasedAt: new Date(),
//     },
//   });

//   // Map Stripe payment status to Prisma enum
//   const paymentStatus = mapStripePaymentStatus(session);

//   // Create a Payment record
//   await prisma.payment.create({
//     data: {
//       stripePaymentId: session.payment_intent as string,
//       userId: userId,
//       amount: session.amount_total!,
//       currency: session.currency!,
//       status: paymentStatus,
//     },
//   });

//   return NextResponse.json({ success: true, userTutorial });
// }
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import Stripe from "stripe";
import { mapStripePaymentStatus } from "@/utils/paymentStatusMapping";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  try {
    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    const { tutorialId, userId } = session.metadata!;

    // Check if UserTutorial record already exists
    const existingUserTutorial = await prisma.userTutorial.findUnique({
      where: {
        userId_tutorialId: {
          userId,
          tutorialId: Number(tutorialId),
        },
      },
    });

    if (!existingUserTutorial) {
      // Create a UserTutorial record if it doesn't exist
      await prisma.userTutorial.create({
        data: {
          userId,
          tutorialId: Number(tutorialId),
          purchasedAt: new Date(),
        },
      });
    }

    // Map Stripe payment status to Prisma enum
    const paymentStatus = mapStripePaymentStatus(session);

    // Extract the Stripe payment intent ID
    const paymentIntentId = (session.payment_intent as Stripe.PaymentIntent).id;

    // Create a Payment record
    const payment = await prisma.payment.create({
      data: {
        stripePaymentId: paymentIntentId, // Pass the string ID, not the object
        userId: userId,
        amount: session.amount_total!,
        currency: session.currency!,
        status: paymentStatus,
      },
    });

    return NextResponse.json({ success: true, payment });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
