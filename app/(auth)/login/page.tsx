"use client";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import { useCustomSession } from "@/hooks/session";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>(""); // Avoid null
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const { loading: sessionLoading } = useCustomSession();

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault(); // Prevent default form submission

    try {
      setLoading(true); // Start loading state

      const signInResult = await signIn("email", {
        email: email.trim(),
        callbackUrl: `${window.location.origin}/role`,
        redirect: false, // Disable automatic redirect
      });

      setLoading(false); // Stop loading state

      if (!signInResult || signInResult.error) {
        alert("Sign-in failed. Please try again."); // Handle failure
        return;
      }

      // Clear the email field and show success toast
      setEmail("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setLoading(false);
      alert(`An error occurred: ${err}`);
    }
  }

  // Show loading state while session check is happening
  if (sessionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#212121]">
      <Link
        href="/"
        className="flex mx-auto pt-5 bg-[#212121] justify-center"
        prefetch={false}
      >
        <h1 className="text-white font-bold text-2xl md:text-3xl">
          Indie<span className="text-[#ffd700]">Skool</span>
        </h1>
      </Link>
      <div className="flex-grow flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-orange-500 w-full max-w-md mx-4 sm:mx-6 md:mx-8 lg:mx-10 h-[400px] md:h-[350px] sm:h-[350px] border border-white rounded-xl p-6">
          <div className="absolute top-6 bg-[#212121] p-2 rounded-lg">
            <h1 className="text-xl md:text-2xl font-bold text-white">Login</h1>
          </div>
          <form onSubmit={signInWithEmail} className="w-full">
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="example@gmail.com"
              className="w-full p-4 md:p-5 max-w-full h-12 md:h-14 rounded-lg outline-none mt-12 mb-5 text-black"
              required
            />
            <button
              type="submit"
              className="flex justify-center items-center w-full h-12 md:h-14 rounded-lg outline-none text-white text-lg md:text-xl bg-[#212121] cursor-pointer active:bg-[#ffffff]/60 active:text-[#212121]"
              disabled={loading} // Disable button when loading
            >
              {loading ? <Loading /> : "Send magic link"}
            </button>
          </form>
        </div>
      </div>
      {showToast && (
        <Toast
          message={"Email sent successfully"}
          duration={3000}
          onClose={() => setShowToast(false)}
          show={showToast}
        />
      )}
    </div>
  );
}
