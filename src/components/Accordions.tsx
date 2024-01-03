import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MaxWidthWraper from "./MaxWidthWraper";

type Props = {};

function Accordions({}: Props) {
  return (
    <div className="my-9 min-h-60 ">
      <MaxWidthWraper>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is CSEN?</AccordionTrigger>
            <AccordionContent>
              CSEN stands for Computer Science and Engineering. It is a field of
              study that combines computer science and engineering principles to
              develop software and hardware solutions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is an RPA plug-in?</AccordionTrigger>
            <AccordionContent>
              An RPA (Robotic Process Automation) plug-in is a software
              component that integrates with an RPA platform to extend its
              functionality. It allows users to automate repetitive tasks and
              streamline business processes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              How can I learn more about CSEN?
            </AccordionTrigger>
            <AccordionContent>
              You can learn more about CSEN by studying computer science and
              engineering courses, participating in online tutorials and
              workshops, and joining relevant communities and forums.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </MaxWidthWraper>
    </div>
  );
}

export default Accordions;
