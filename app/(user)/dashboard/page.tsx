"use client";
import { useCustomSession } from "@/hooks/session";
import apj from "../../../public/images/apjsir.jpg";
import { ArrowBigRight, Divide, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import LogoHeader from "@/components/LogoHeader";
import Loading from "@/components/Loading";

interface courseCard {
  name: string;
}

export default function Dashboard() {
  const [isCoursePurchased, SetIsCoursePurchased] = useState(false);
  const { loading } = useCustomSession();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className=" p-4 sm:ml-64 bg-[#212121] h-screen">
        <LogoHeader admin={false} />
        {/* <div className="flex w-full  "> */}
        <LargeCard />
        {/* </div> */}
      </div>
    </>
  );
}
const LargeCard = () => (
  <div className="flex max-w-2xl flex-col items-center justify-center h-48 max-w-screen m-4 rounded cursor-pointer bg-gray-400 ">
    <Plus className="text-white size-15 border border-collapse " />
    <p>Find your first tutorial and start building it</p>
  </div>
);
