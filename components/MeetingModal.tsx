import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type MeetingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  buttonText?: string;
  handleClick?: () => void;
  image?: string;
  buttonIcon?: string;
};

const MeetingModal = ({
  isOpen,
  onClose,
  className,
  buttonText,
  handleClick,
  children,
  title,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-6 px-6 py-9 w-full max-w-lg border-none bg-dark-1 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="modal image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-semibold leading-10")}>{title}</h1>
          {children}
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={12}
                height={12}
              />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
