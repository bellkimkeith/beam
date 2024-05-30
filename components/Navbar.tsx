import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <nav className="flex items-center w-full px-6 py-4 fixed z-50 bg-dark-1 lg:px-10">
      <Link href="/" className="flex gap-1 items-center">
        <Image
          src="icons/beam.svg"
          height={50}
          width={50}
          alt="Beam logo"
          className="max-sm:size-10 max-sm:hidden"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Beam
        </p>
      </Link>
      <div className="flex items-center justify-between gap-5">
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
