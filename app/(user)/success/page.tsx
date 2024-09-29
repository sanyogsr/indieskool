"use client"; // Ensure this is a client component

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

const SuccessPageContent = () => {
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      const confirmPurchase = async () => {
        try {
          const response = await axios.post("/api/payments", {
            sessionId,
          });
          console.log("Tutorial purchase confirmed:", response.data);
        } catch (error) {
          console.error("Error confirming tutorial purchase:", error);
        } finally {
          setLoading(false);
        }
      };

      confirmPurchase();
    }
  }, [sessionId]);

  useEffect(() => {
    if (!loading) {
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            router.push("/dashboard/courses");
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-600">
          Thank you for your purchase!
        </h1>
        <p className="mb-4">
          {loading
            ? "Confirming your purchase..."
            : `Redirecting to your updated tutorial page in ${countdown} seconds`}
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
};

// Wrap the SuccessPageContent in Suspense
const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
