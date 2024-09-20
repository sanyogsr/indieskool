"use client";
import { useCustomSession } from "@/hooks/session";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

function Role() {
  const [role, setRole] = useState("");
  const router = useRouter();
  const { isLoggedIn } = useCustomSession();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "indiehacker") {
      router.push("/admin/dashboard");
    } else if (role === "learner") {
      router.push("/dashboard");
    }
  };
  if (!isLoggedIn) {
    redirect("/login");

    return null;
  }

  if (isLoggedIn) {
    return (
      <div className=" flex flex-col justify-center h-screen  bg-[#212121] w-full">
        <div className=" ">
          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto bg-white p-6 rounded-lg"
          >
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900 "
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
              <option value="indiehacker">Indie hacker</option>
              <option value="learner">Learner</option>
            </select>

            <button
              type="submit"
              className=" bg-gradient-to-r from-yellow-400 to-orange-500 py-1 px-2 rounded-lg"
            >
              Let&apos;s go
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Role;
