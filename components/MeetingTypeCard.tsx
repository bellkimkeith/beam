import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type MeetingTypeCardProps = {
  header: string;
  subHeader: string;
  icon: string;
  handleClick: (header: string) => void;
};

const MeetingTypeCard = ({
  header,
  subHeader,
  icon,
  handleClick,
}: MeetingTypeCardProps) => {
  let color = "";
  switch (header) {
    case "New Meeting":
      color = "bg-orange-1";
      break;
    case "Join Meeting":
      color = "bg-blue-500";
      break;
    case "Schedule Meeting":
      color = "bg-purple-1";
      break;
    case "View Recordings":
      color = "bg-yellow-1";
      break;

    default:
      break;
  }
  return (
    <div
      className={cn(
        "w-full xl:max-w-72 min-h-64 px-4 py-6 flex flex-col justify-between rounded-2xl cursor-pointer",
        color
      )}
      onClick={() => handleClick(header)}
    >
      <div className="flex items-center justify-center glassmorphism size-12 rounded-xl">
        <Image src={icon} alt="meeting type icon" width={24} height={24} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{header}</h1>
        <p className="text-lg font-normal">{subHeader}</p>
      </div>
    </div>
  );
};

export default MeetingTypeCard;
