"use client";
import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="sticky top-[25%] left-4 flex flex-col h-fit w-fit justify-between bg-dark-1 p-6 text-white max-sm:hidden rounded-3xl">
      <div className="flex flex-1 flex-col gap-6">
        {sideBarLinks.map((link) => {
          const isActive = pathName === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 p-4 items-center justify-start rounded-xl",
                {
                  "bg-blue-500": isActive,
                }
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
