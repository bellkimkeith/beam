"use client";
import React from "react";
import MeetingTypeCard from "./MeetingTypeCard";
import { meetingtypes } from "@/constants";

const MeetingTypeList = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {meetingtypes.map((type, index) => (
        <MeetingTypeCard
          key={index}
          header={type.header}
          subHeader={type.subHeader}
          icon={type.icon}
          color={type.color}
        />
      ))}
    </section>
  );
};

export default MeetingTypeList;
