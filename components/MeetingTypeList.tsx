"use client";
import React, { useState } from "react";
import MeetingTypeCard from "./MeetingTypeCard";
import { meetingtypes } from "@/constants";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

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

  const startMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select date and time",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: { starts_at: startsAt, custom: { description } },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {meetingtypes.map((type, index) => {
        return (
          <MeetingTypeCard
            key={index}
            header={type.header}
            subHeader={type.subHeader}
            icon={type.icon}
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
