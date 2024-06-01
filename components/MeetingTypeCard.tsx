import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const MeetingTypeCard = ({
  header,
  subHeader,
  icon,
  color,
}: {
  header: string;
  subHeader: string;
  icon: string;
  color: string;
}) => {
  return (
    <div
      className={cn(
        "w-full xl:max-w-72 min-h-64 px-4 py-6 flex flex-col justify-between rounded-2xl cursor-pointer",
        color
      )}
      onClick={() => {}}
    >
      <div className="flex items-center justify-center glassmorphism size-12 rounded-xl">
        <Image src={icon} alt="meeting icon" width={24} height={24} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{header}</h1>
        <p className="text-lg font-normal">{subHeader}</p>
      </div>
    </div>
  );
};

export default MeetingTypeCard;
