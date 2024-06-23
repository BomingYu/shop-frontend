"use client";

import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="p-3 items-center drop-shadow-2xl dark:bg-zinc-800 dark:text-gray-200 bg-gray-300">
      <span className="text-black dark:text-white text-md ml-3 font-navBarFont ">
        Created by{" "}
        <Link
          href="https://www.bomingyu.com"
          className="text-cyan-600 dark:text-orange-300 underline font-bold animate-pulse hover:animate-none"
        >
          BomingYu
          <FaExternalLinkAlt className="inline-block animate-bounce"/>
        </Link>{" "}
        @2024
      </span>
    </div>
  );
}
