"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for hamburger and close

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      className="
        bg-[#fffae4]
        lg:px-10 lg:py-10 h-14 flex items-center  
        lg:max-w-8xl 
        lg:mx-20 lg:my-5 justify-between
        lg:rounded-lg
        md:rounded-none
        sm:rounded-none 
      "
    >
      <Link href="/" className="flex lg:mx-0 mx-auto" prefetch={false}>
        <h1 className="text-black font-extrabold text-4xl">
          Indie<span className="text-black">Skool</span>
        </h1>
      </Link>

      {/* Hamburger Icon for mobile screens */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="mr-4" // Adjust the right spacing of the icon
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`lg:hidden fixed inset-0 bg-[#212121] text-white z-50 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-5">
          <button onClick={toggleMenu} aria-label="Close Menu">
            <X size={32} />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center gap-6 h-[80%]">
          <li>
            <Link
              href="/login"
              className="text-lg font-medium hover:underline underline-offset-4"
              prefetch={false}
              onClick={toggleMenu}
            >
              Tutorials
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="text-lg font-medium hover:underline underline-offset-4"
              prefetch={false}
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex gap-10 py-5 px-10 bg-[#212121] rounded-full">
        <Link
          href="/login"
          className="text-xl font-medium hover:underline underline-offset-4 text-white"
          prefetch={false}
        >
          Tutorials
        </Link>

        <Link
          href="/about"
          className="text-xl font-medium hover:underline underline-offset-4 text-white"
          prefetch={false}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
