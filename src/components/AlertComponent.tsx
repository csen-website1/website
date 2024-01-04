import React from "react";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { text } from "stream/consumers";

type Props = {
  duration?: number;
  text: string;
  state: boolean;
};

function AlertComponent({ text, state }: Props) {
  return (
    <div>
      {state ? (
        <Alert className="bg-destructive/40 w-fit flex-row  items-center flex-nowrap ">
          <ExclamationTriangleIcon className="h-8 w-8" />
          <div className="mx-4">
            <AlertTitle>Something Went Wrong</AlertTitle>
            <AlertDescription>{text}</AlertDescription>
          </div>
        </Alert>
      ) : (
        <Alert className="bg-green-400/40 w-fit flex-row  items-center flex-nowrap ">
          <CheckCircledIcon className="h-8 w-8" />
          <div className="mx-4">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{text}</AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
}

export default AlertComponent;
