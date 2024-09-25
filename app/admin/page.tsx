"use client";
import { useEffect, useState } from "react";
import { useCustomSession } from "@/hooks/session";
import Loading from "@/components/Loading";
import Link from "next/link";
import Image from "next/image";
import apj from "../../public/images/apjsir.jpg";
import {
  AlignJustify,
  ArrowBigRight,
  LayoutDashboard,
  LogOut,
  NotebookText,
  Search,
  User,
  Upload,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, name: "Dashboard", link: "/dashboard" },
  { icon: Search, name: "Your Courses", link: "/search" },
  { icon: NotebookText, name: "Earnings", link: "/courses" },
  { icon: User, name: "Profile", link: "/profile" },
  { icon: LogOut, name: "Logout", link: "/logout" },
];

interface UserData {
  id: string;
  role: string | null;
  name: string | null;
  email: string;
}

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

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100"
      >
        <span className="sr-only">Open sidebar</span>
        <AlignJustify />
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#212121] border-r ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-5 py-7 overflow-y-auto">
          <button
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="absolute top-4 right-4 sm:hidden"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <ul className="space-y-4 mt-5 font-medium">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="flex items-center p-2 rounded-lg text-white hover:bg-gray-600"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 bg-[#212121] h-screen">
        <div className="flex justify-center pb-5">
          <h1 className="text-3xl font-bold text-white text-center">
            Indie<span className="text-yellow-500">Skool</span>
            <span className="text-sm pl-2">Admin</span>
          </h1>
        </div>
        <div className="flex w-full">
          {isCoursePurchased ? (
            <div className="flex flex-wrap">
              {courses.map((course, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
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
}

const LargeCard = () => (
  <div className="w-full flex flex-col">
    <div className="flex flex-col items-center justify-center h-48 min-w-3xl m-10 rounded cursor-pointer bg-gray-400">
      <Upload className="text-gray-700" />
      <h1 className="">You don&apos;t have any courses, Please upload ..!</h1>
    </div>
  </div>
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
