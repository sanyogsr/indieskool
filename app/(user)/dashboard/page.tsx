"use client";
import { useCustomSession } from "@/hooks/session";
import { redirect } from "next/navigation";
import apj from "../../../public/images/apjsir.jpg";
import { ArrowBigRight, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import LogoHeader from "@/components/LogoHeader";

interface courseCard {
  name: string;
}

const courses = [
  {
    name: "Marketing of saas",
    image:
      "https://unsplash.com/photos/a-man-sitting-at-a-table-using-a-laptop-computer-l_p4pay8CTM",
  },
  {
    name: "marketing of saas",
    image:
      "https://unsplash.com/photos/a-man-sitting-at-a-table-using-a-laptop-computer-l_p4pay8CTM",
  },
  {
    name: "marketing of saas",
    image:
      "https://unsplash.com/photos/a-man-sitting-at-a-table-using-a-laptop-computer-l_p4pay8CTM",
  },
  {
    name: "marketing of saas",
    image:
      "https://unsplash.com/photos/a-man-sitting-at-a-table-using-a-laptop-computer-l_p4pay8CTM",
  },
  {
    name: "marketing of saas",
    image:
      "https://unsplash.com/photos/a-man-sitting-at-a-table-using-a-laptop-computer-l_p4pay8CTM",
  },
  {
    name: "marketing of saas",
    image:
      "https://unsplash.com/photos/a-man-sitting-at-a-table-using-a-laptop-computer-l_p4pay8CTM",
  },
  {
    name: "marketing of saas",
    image:
      "https://unsplash.com/photos/a-man-sitting-at-a-table-using-a-laptop-computer-l_p4pay8CTM",
  },
];

export default function Dashboard() {
  const [isCoursePurchased, SetIsCoursePurchased] = useState(false);
  const { isLoggedIn } = useCustomSession();

  useEffect(() => {
    if (courses.length === 0) {
      SetIsCoursePurchased(false);
    } else {
      SetIsCoursePurchased(true);
    }
    return;
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <div className=" p-4 sm:ml-64 bg-[#212121] h-full">
          <LogoHeader />
          <div className="flex w-full  ">
            {isCoursePurchased ? (
              <div className="flex flex-wrap ">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-1/1 md:w-1/2 lg:w-1/3 p-2 overflow-hidden"
                  >
                    <CourseCard name={course.name} />
                  </div>
                ))}
              </div>
            ) : (
              <LargeCard />
            )}
          </div>
        </div>
      </>
    );
  } else {
    redirect("/");
  }
}
const LargeCard = () => (
  <div className="flex  items-center justify-center h-48 max-w-screen m-4 rounded cursor-pointer bg-gray-400 ">
    <Plus className="text-white size-15 border border-collapse " />
  </div>
);
const CourseCard = ({ name }: courseCard) => (
  <div className="flex flex-col rounded-xl ">
    <div className="flex flex-col justify-between h-[20rem] md:h-[20rem] lg:h-[30rem] min-w-[15rem]  m-10  rounded cursor-pointer bg-white">
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
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none "
        >
          Go to Course
          <ArrowBigRight />
        </Link>
      </div>
    </div>
  </div>
);
