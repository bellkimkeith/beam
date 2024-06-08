//@ts-nocheck

"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";
import Image from "next/image";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { upcomingCalls, endedCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCalls = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recorded Calls";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "ended":
        return "/icons/previous.svg";
      case "recordings":
        return "/icons/recordings.svg";
      case "upcoming":
        return "/icons/upcoming.svg";
      default:
        return "";
    }
  };

  const handleClick = (meeting) => {
    if (type === "recordings") {
      return () => {
        router.push(`${meeting.url}`);
      };
    }

    return () => {
      router.push(`/meeting/${meeting.id}`);
    };
  };

  useEffect(() => {
    try {
      const fetchRecordings = async () => {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.duration.length)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      };

      if (type === "recordings") fetchRecordings();
    } catch (error) {
      toast({ title: "Try again later" });
    }
  }, [type, toast, callRecordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCalls();

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Image
          src="/icons/loading-circle.svg"
          alt="loading icon"
          width={50}
          height={50}
        />
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {(calls && calls.length) || recordings.length ? (
        calls.map((meeting: Call | CallRecording, index: number) => (
          <MeetingCard
            key={index}
            icon={getIcon()}
            title={
              meeting.state?.custom.description.substring(0, 26) ||
              meeting.filename.substring(0, 20) ||
              "No Description"
            }
            date={
              meeting.state?.startsAt?.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon={type === "recordings" && "/icons/play.svg"}
            handleClick={handleClick(meeting)}
            link={
              type === "recordings"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
            buttonText={type === "recordings" ? "Play" : "Start"}
          />
        ))
      ) : (
        <h1 className="font-semibold">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
