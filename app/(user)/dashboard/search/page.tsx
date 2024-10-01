"use client";
// export default TutorialPage;
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import TutorialCard from "@/components/UserTutorialCard";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Tutorial {
  id: number;
  title: string;
  description: string;
  price: number;
  isPurchased: boolean;
  duration?: string;
  rating?: number;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  ownerStripeAccountId: string | null;
}

const TutorialPage = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, fetchUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchTutorials = async () => {
      if (!user || !user.id) return;
      try {
        const response = await axios.get(`/api/get-tutorials`, {
          headers: { userId: user.id },
        });
        setTutorials(response.data);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, [user]);

  const handleEnroll = async (tutorialId: number) => {
    if (!user || !user.id) {
      console.error("User not logged in");
      return;
    }

    try {
      // Fetch the specific tutorial details including the owner's Stripe account ID
      const tutorialResponse = await axios.get(
        `/api/get-tutorials/${tutorialId}`
      );
      const { ownerStripeAccountId } = tutorialResponse.data;

      if (!ownerStripeAccountId) {
        console.error("Tutorial owner's Stripe account not found");
        return;
      }

      // Create Stripe Checkout session
      const response = await axios.post("/api/stripe", {
        tutorialId,
        userId: user.id,
        ownerStripeAccountId,
      });
      const { sessionId } = response.data;

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe redirect error:", error);
        // Show an error message to the user
      }
    } catch (error) {
      console.error("Error during enrollment process:", error);
      // Show an error message to the user
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:ml-64 bg-[#212121] min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Explore Tutorials
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.id}
            {...tutorial}
            onEnroll={handleEnroll}
          />
        ))}
      </div>
    </div>
  );
};

export default TutorialPage;
