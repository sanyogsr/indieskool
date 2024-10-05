"use client";
import { useCustomSession } from "@/hooks/session";
import { ArrowRight, Plus } from "lucide-react";
import LogoHeader from "@/components/LogoHeader";
import Link from "next/link";
import { useTutorialStore } from "@/store/tutorialStore";
import TutorialCard from "@/components/UserTutorialCard";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

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
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export default function Dashboard() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  const { user, fetchUser } = useUserStore();
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
    <>
      <div className=" p-4 sm:ml-64 bg-[#212121] min-h-screen">
        <LogoHeader admin={false} />
        <div className="flex w-full  ">
          {tutorials ? null : (
            <Link href={"/dashboard/search"}>
              {" "}
              <LargeCard />
            </Link>
          )}
        </div>
        {loading ? (
          <div className="flex items-center justify-center mt-[10em]">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : tutorials && tutorials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full px-4 sm:px-8 lg:px-16">
            {tutorials.map((tutorial: Tutorial) => (
              <TutorialCard
                key={tutorial.id}
                {...tutorial}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[89vh]">
            <p className="text-white mt-4">
              No tutorials found. Find{" "}
              <Link
                href="/dashboard/search"
                className="text-blue-400 hover:underline"
              >
                here
              </Link>
            </p>
          </div>
        )}
        {tutorials && tutorials.length > 0 && (
          <div className="flex justify-center">
            <div className="flex justify-center max-w-[14em] items-center rounded-lg cursor-pointer hover:scale-105 text-gray-800 py-2 px-5 mt-7 bg-white">
              <Link href="/dashboard/search/">View All Tutorials</Link>
              <ArrowRight className="size-5 ml-2" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
const LargeCard = () => (
  <div className="flex max-w-2xl flex-col gap-5  items-center justify-center h-48 max-w-screen m-4 rounded cursor-pointer bg-gray-400 ">
    <Plus className="text-white size-15 border border-collapse " />
    <p>Find your tutorial and start building it</p>
  </div>
);
