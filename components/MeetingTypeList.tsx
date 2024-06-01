"use client";
import React, { useState } from "react";
import MeetingTypeCard from "./MeetingTypeCard";
import { meetingtypes } from "@/constants";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const router = useRouter();

  const handleClick = (header: string) => {
    switch (header) {
      case "New Meeting":
        setMeetingState("isInstantMeeting");
        break;
      case "Join Meeting":
        setMeetingState("isJoiningMeeting");
        break;
      case "Schedule Meeting":
        setMeetingState("isScheduleMeeting");
        break;
      case "View Recordings":
        setMeetingState(undefined);
        router.push("/recordings");
        break;

      default:
        break;
    }
  };

  const startMeeting = () => {};

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {meetingtypes.map((type, index) => {
        return (
          <MeetingTypeCard
            key={index}
            header={type.header}
            subHeader={type.subHeader}
            icon={type.icon}
            color={type.color}
            handleClick={handleClick}
          />
        );
      })}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="New Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={startMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
