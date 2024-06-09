"use client";
import React, { useState } from "react";
import MeetingTypeCard from "./MeetingTypeCard";
import { meetingtypes } from "@/constants";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

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
        router.push(values.link);
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

  const meetingLink =
    callDetails &&
    `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails.id}`;

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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Schedule Meeting"
          handleClick={startMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-sky-2 text-base font-normal leading-6">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label className="text-sky-2 text-base font-normal leading-6">
              Select date and time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              minDate={new Date()}
              maxDate={
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
              }
              filterTime={(date) => {
                const isPastTime = new Date().getTime() > date.getTime();
                return !isPastTime;
              }}
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Scheduled"
          handleClick={() => {
            if (meetingLink) {
              navigator.clipboard.writeText(meetingLink);
              toast({ title: "Link copied" });
            }
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="New Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={startMeeting}
      />

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Input link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={startMeeting}
      >
        <Input
          placeholder="Meeting link"
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList;
