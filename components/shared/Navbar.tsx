"use client";
import React from "react";
import Link from "next/link";


const Navbar: React.FC = () => {
  return (
    <nav
      className="p-4 relative top-0 left-0 z-50 w-full"
      style={{
        backgroundColor: "var(--background-color2)",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <div className="w-full px-4 flex justify-between items-center">
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="hover:text-gray-300">
              {"Home"}
            </Link>
          </li>
          <li>
            <Link href="/explore" className="hover:text-gray-300">
              {"Explore"}
            </Link>
          </li>
          <li>
            <Link href="/pool" className="hover:text-gray-300">
              {"Pool"}
            </Link>
          </li>
          <li>
            <Link href="/trade" className="hover:text-gray-300">
              {"Trade"}
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
