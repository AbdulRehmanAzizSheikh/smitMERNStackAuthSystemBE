"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
      if (windowSize >= 768) {
        setIsCollapsed(false);
      }
    });
  }, []);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-blue-500 text-white">
      <div className="font-bold text-xl cursor-pointer">
        <Link href="/">App Name</Link>
      </div>
      {windowSize >= 600 && (
        <ul className="flex gap-4">
          <li>Home</li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      )}
      <div>
        <Link
          href="/login"
          className="border border-gray-300 px-4 py-2 rounded-md rounded-r-none "
        >
          Login
        </Link>
        <Link
          href="/register"
          className="border border-gray-300 px-4 py-2 rounded-md rounded-l-none "
        >
          Sign Up
        </Link>
      </div>
      {windowSize < 600 && (
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          <GiHamburgerMenu size={30} />
        </button>
      )}
      {isCollapsed && (
        <div className="absolute top-15 right-0 bg-blue-500">
          <ul className="flex flex-col items-end gap-2 px-5 py-2">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </ul>
        </div>
      )}
    </nav>
  );
}
