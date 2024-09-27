import Sidebar from "@/components/Sidebar";
import React from "react";

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar admin={true} />
      {children}
    </>
  );
}
