import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 fixed z-50 lg:px-10 backdrop-blur-sm">
      <Link href="/" className="flex gap-1 items-center max-md:hidden">
        <Image
          src="icons/logo.svg"
          height={50}
          width={50}
          alt="Beam logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white ">Beam</p>
      </Link>
      <div className="flex flex-1 justify-between">
        <MobileNav />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
