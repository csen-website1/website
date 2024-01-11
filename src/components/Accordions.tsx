import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MaxWidthWraper from "./MaxWidthWraper";

type Props = {};

const accourdionData = [
  {
    title: "What is CSEN?",
    content:
      "CSEN stands for Computer Science and Engineering. It is a field of study that combines computer science and engineering principles to develop software and hardware solutions.",
  },
  {
    title: "What is an RPA plug-in?",
    content:
      "An RPA (Robotic Process Automation) plug-in is a software component that integrates with an RPA platform to extend its functionality. It allows users to automate repetitive tasks and streamline business processes.",
  },
  {
    title: "How can I learn more about CSEN?",
    content:
      "You can learn more about CSEN by studying computer science and engineering courses, participating in online tutorials and workshops, and joining relevant communities and forums.",
  },
];

function Accordions({}: Props) {
  return (
    <div className="my-9 min-h-60 ">
      <MaxWidthWraper>
        {accourdionData.map((item, index) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
        {/* <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is CSEN?</AccordionTrigger>
            <AccordionContent>
              CSEN stands for Computer Science and Engineering. It is a field of
              study that combines computer science and engineering principles to
              develop software and hardware solutions.
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </MaxWidthWraper>
    </div>
  );
}

export default Accordions;
