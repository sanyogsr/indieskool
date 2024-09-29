"use client";
import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore"; // Assuming you have this store
import LogoHeader from "@/components/LogoHeader";
import axios from "axios";

function ProfilePage() {
  const { user, fetchUser, setUser } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSettingUpStripe, setIsSettingUpStripe] = useState(false);
  const [stripeSetupSuccess, setStripeSetupSuccess] = useState(false);

  useEffect(() => {
    fetchUser(); // Fetch user when the component mounts
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Function to toggle editing mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Function to save user details
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await axios.put("/api/user", { name });
      setUser(response.data.user); // Update user in Zustand store
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Function to set up Stripe account
  const handleStripeSetup = async () => {
    setIsSettingUpStripe(true);
    setStripeSetupSuccess(false); // Reset success state before setup
    try {
      const response = await axios.post("/api/stripe/setup");
      window.location.href = response.data.url; // Redirect to Stripe onboarding
    } catch (error) {
      console.error("Failed to set up Stripe account", error);
    } finally {
      setIsSettingUpStripe(false);
    }
  };

  // Function to simulate account setup success (for demo purpose)
  const simulateStripeAccountAdded = () => {
    setStripeSetupSuccess(true);
  };

  // Determine the button text based on Stripe account status
  const renderStripeButton = () => {
    if (user?.hasStripeAccount) {
      return (
        <div className="mb-4">
          <button
            disabled
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Stripe Account Linked
          </button>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <button
            onClick={handleStripeSetup}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {isSettingUpStripe ? "Setting Up..." : "Add Stripe Account"}
          </button>
        </div>
      );
    }
  };

  return (
    <div className="p-4 sm:ml-64 bg-[#212121] min-h-screen">
      <LogoHeader admin={false} />

      <div className="w-full h-auto mt-8 flex justify-center items-center">
        <div className="bg-[#333333] p-8 rounded-lg shadow-lg w-full sm:w-1/2 lg:w-1/3">
          <h1 className="text-white text-2xl font-bold mb-4">Profile</h1>

          {/* Name Field */}
          <div className="mb-4">
            <label className="text-white text-sm font-semibold mb-2 block">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-[#444] text-white border border-gray-600 focus:outline-none focus:ring focus:border-yellow-500"
              />
            ) : (
              <p className="text-gray-300">{name}</p>
            )}
          </div>

          {/* Email Field (Uneditable) */}
          <div className="mb-4">
            <label className="text-white text-sm font-semibold mb-2 block">
              Email
            </label>
            <p className="text-gray-300">{email}</p>
          </div>

          {/* Edit Mode Button */}
          <div className="flex justify-between">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={toggleEditMode}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={toggleEditMode}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
