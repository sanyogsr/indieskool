"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

export default function LogoHeader({ admin }: { admin: boolean }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleLogout = async () => {
   
    await signOut({ callbackUrl: "/" });

    setIsOpenModal(false);
  };

  return (
    <div className="relative flex justify-between items-center h-[3rem] px-4">
      {/* Centered Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
        <h1 className="text-3xl font-bold text-white">
          Indie<span className="text-yellow-500">Skool</span>{" "}
          {admin ? <span className="text-sm pl-2">Admin</span> : null}
        </h1>
      </div>

      {/* Logout button on the end */}
      <div className="ml-auto hidden sm:block">
        <button
          onClick={toggleModal}
          className="px-4 py-2 text-white bg-red-600 rounded"
        >
          Logout
        </button>
      </div>

      {/* Modal for confirming logout */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="mb-5 text-lg">Are you sure you want to logout?</h3>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-500"
              >
                Yes, Logout
              </button>
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-black bg-gray-300 rounded"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
