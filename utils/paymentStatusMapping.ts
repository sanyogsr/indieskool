import { PaymentStatus as PrismaPaymentStatus } from "@prisma/client";
import Stripe from "stripe";

export function mapStripePaymentStatus(
  stripeSession: Stripe.Checkout.Session
): PrismaPaymentStatus {
  const { payment_status, status } = stripeSession;

  switch (payment_status) {
    case "paid":
      return PrismaPaymentStatus.COMPLETED;
    case "unpaid":
      // Check if the session has expired or been canceled
      if (status === "expired") {
        return PrismaPaymentStatus.FAILED;
      }
      return PrismaPaymentStatus.PENDING;
    case "no_payment_required":
      return PrismaPaymentStatus.NO_PAYMENT_REQUIRED;
    default:
      throw new Error(`Unknown Stripe payment status: ${payment_status}`);
  }
}
