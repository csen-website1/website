import React from "react";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { text } from "stream/consumers";

type Props = {
  text: String;
  alert: boolean;
  state: boolean;
};

function AlertComponent({ text, state, alert }: Props) {
  return (
    <div className={`fixed bottom-5 right-0 ${alert ? "block" : "hidden"}`}>
      {!state ? (
        <Alert className="bg-destructive/40 w-fit flex-row  items-center flex-nowrap ">
          <ExclamationTriangleIcon className="h-8 w-8" />
          <div className="mx-4">
            <AlertTitle>Something Went Wrong</AlertTitle>
            <AlertDescription>
              {" "}
              {text ||
                "Ops ! There some Unknown Error Please Try Again Later ! "}
            </AlertDescription>
          </div>
        </Alert>
      ) : (
        <Alert className="bg-green-400/40 w-fit flex-row  items-center flex-nowrap ">
          <CheckCircledIcon className="h-8 w-8" />
          <div className="mx-4">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              {text || "Your Submission has been recived ! "}
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
}

export default AlertComponent;
