import { cn } from "@/lib/utils";
import { ReactNode } from "react";
const MaxWidthWraper = ({
  classNme,
  children,
}: {
  classNme?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-4 md:px-20 ", classNme)}
    >
      {children}
    </div>
  );
};

export default MaxWidthWraper;
