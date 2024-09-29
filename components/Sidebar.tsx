"use client";
import React, { useState } from "react";
import {
  AlignJustify,
  DollarSign,
  LayoutDashboard,
  NotebookText,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar({ admin }: { admin: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      name: "DashBoard",
      link: `${admin ? "/admin" : "/dashboard"}`,
    },
    {
      icon: admin ? DollarSign : Search,
      name: `${admin ? "Revenue" : "Search courses"}`,
      link: `${admin ? "/admin/revenue" : "/dashboard/search"}`,
    },
    {
      icon: NotebookText,
      name: "Your tutorials",
      link: `${admin ? "/admin/courses/" : "/dashboard/courses/"}`,
    },
    {
      icon: User,
      name: "Profile",
      link: `${admin ? "/admin/profile" : "/dashboard/profile"}`,
    },
  ];
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="bg-[#212121] flex items-center justify-between p-2 sm:hidden  md:hidden lg:hidden ">
        {" "}
        <button
          data-drawer-target="cta-button-sidebar"
          data-drawer-toggle="cta-button-sidebar"
          aria-controls="cta-button-sidebar"
          onClick={toggleSidebar}
          type="button"
          aria-expanded={isOpen}
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden lg:hidden  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <AlignJustify />
        </button>
        <h1 className="text-3xl font-bold text-white">
          Indie<span className="text-yellow-500">Skool</span>
          {admin ? <span className="text-sm pl-2">Admin</span> : null}
        </h1>
        <div className="mr-2">
          <button
            //   onClick={toggleModal}
            className="px-4 py-2 text-white bg-red-600 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#212121] border-r border-slate-600 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }   sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-5 py-7 overflow-y-auto ">
          <button
            onClick={closeSidebar}
            aria-label="Close sidebar"
            className="absolute top-4 right-4 text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 sm:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <ul className=" space-y-4 mt-5 font-medium">
            {sidebarItems.map((item, index) => {
              const isActive = pathname === item.link;
              return (
                <li key={index}>
                  <Link
                    href={item.link}
                    className={`flex items-center p-2  rounded-lg  text-white  ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-600"
                    }  dark:hover:bg-gray-700 group1`}
                  >
                    <item.icon className="w-5 h-5 transition duration-75 text-white   dark:group-hover:text-white" />
                    <span className="ms-3 ">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
