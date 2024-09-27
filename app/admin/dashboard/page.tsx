"use client";
import { useEffect, useState } from "react";
import { useCustomSession } from "@/hooks/session";
import Loading from "@/components/Loading";
import Link from "next/link";
import Image from "next/image";
import apj from "../../../public/images/apjsir.jpg";
import { ArrowBigRight, Upload } from "lucide-react";
import LogoHeader from "@/components/LogoHeader";

interface Course {
  image: number;
  name: string;
  description: string;
}

const courses: Course[] = [];

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCoursePurchased, SetIsCoursePurchased] = useState(false);

  const { loading } = useCustomSession();

  useEffect(() => {
    if (courses.length === 0) {
      SetIsCoursePurchased(false);
    } else {
      SetIsCoursePurchased(true);
    }
  }, []);

  // const toggleSidebar = () => setIsOpen(!isOpen);
  // const closeSidebar = () => setIsOpen(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 sm:ml-64 bg-[#212121] h-screen ">
        <LogoHeader admin={true} />
        <div className="flex w-full items-center justify-center">
          {isCoursePurchased ? (
            <div className="flex flex-wrap">
              {courses.map((course, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                  <CourseCard name={course.name} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center h-[89vh]">
              {" "}
              <LargeCard />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const LargeCard = () => (
  <Link href={"/admin/dashboard/upload"}>
    <div className="hover:bg-yellow-600 cursor-pointer hover:text-white bg-gray-400 flex flex-col my-20 justify-center items-center rounded-lg p-5">
      {" "}
      <Upload className="" />
      <h1 className="">Upload tutorial..!</h1>
    </div>
  </Link>
);

const CourseCard = ({ name }: { name: string }) => (
  <div className="flex flex-col rounded-xl">
    <div className="flex flex-col justify-between h-[20rem] md:h-[20rem] lg:h-[30rem] min-w-[15rem] m-10 rounded bg-white">
      <Link href={"/course/:id"}>
        <Image
          src={apj}
          alt="Course Image"
          className="h-[22rem] w-full object-cover rounded-t-xl"
        />
      </Link>
      <div className="pb-4 px-2">
        <Link href={"/course"}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {name}
          </h5>
        </Link>
        <Link
          href={"/course"}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#212121] rounded-lg hover:bg-[#ff9e0b]"
        >
          Start Now <ArrowBigRight />
        </Link>
      </div>
    </div>
  </div>
);
