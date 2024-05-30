"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="menu icon"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1 text-white">
          <SheetClose asChild>
            <Link href="/" className="flex gap-1 items-center border-b pb-5">
              <Image
                src="icons/beam.svg"
                height={50}
                width={50}
                alt="Beam logo"
                className="max-sm:size-10"
              />
              <p className="text-[26px] font-extrabold text-white">Beam</p>
            </Link>
          </SheetClose>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <section className="flex h-full gap-2 pt-5 flex-col text-white">
              {sideBarLinks.map((link) => {
                const isActive =
                  pathName === link.route ||
                  pathName.startsWith(`${link.route}/`);
                return (
                  <SheetClose asChild key={link.route}>
                    <Link
                      href={link.route}
                      key={link.label}
                      className={cn(
                        "flex w-full max-w-60 gap-2 p-2 rounded-lg",
                        { "bg-blue-500": isActive }
                      )}
                    >
                      <Image
                        src={link.imgUrl}
                        alt={link.label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold">{link.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
