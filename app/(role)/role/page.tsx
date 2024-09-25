"use client";

import Loading from "@/components/Loading";
import { useCustomSession } from "@/hooks/session";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type UserData = {
  id: string;
  role: string | null;
  name: string | null;
  email: string;
};

const Role = () => {
  const [role, setRole] = useState("");
  const router = useRouter();
  const { isLoggedIn, loading, session } = useCustomSession();
  const [userLoading, setUserLoading] = useState(false); // Still loading until we fetch user data

  const [userData, setUserData] = useState<UserData | null>(null);
  const [isDataFetched, setIsDataFetched] = useState(false); // New flag to track when data is fetched

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn && session) {
        try {
          const res = await fetch("/api/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          setUserData(data.user);

          // Check user role and redirect accordingly
          if (data.user.role === "USER") {
            router.push("/dashboard");
          } else if (data.user.role === "ADMIN") {
            router.push("/admin/dashboard");
          } else {
            // If role is not assigned, allow role selection
            setUserLoading(false);
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
        } finally {
          setIsDataFetched(true); // Mark data fetch as complete
        }
      }
    };

    if (isLoggedIn && session) {
      fetchUserData();
    } else {
      setIsDataFetched(true); // Session is not available or user is not logged in
    }
  }, [isLoggedIn, session, router]);

  // Handle role submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return alert("Please select a role");
    if (!userData) return alert("User data not available");

    fetch("/api/user/role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userData.id, role: role }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update role");
        return res.json();
      })
      .then(() => {
        alert("Role updated successfully");
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        alert("Error updating role");
      });
  };

  // Show loading state until both session and user data are fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  if (!isLoggedIn) {
    redirect("/login");
    return null;
  }

  // Render the role selection form only if no role is assigned yet
  return (
    <div className="flex flex-col justify-center h-screen bg-[#212121] w-full">
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto bg-white p-6 rounded-lg"
        >
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select role
          </label>
          <select
            name="role"
            className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:border-yellow-600"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="" disabled>
              Choose Your Role
            </option>
            <option value="ADMIN">Indie hacker</option>
            <option value="USER">Learner</option>
          </select>

          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 py-1 px-2 rounded-lg"
          >
            Let&apos;s go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Role;
