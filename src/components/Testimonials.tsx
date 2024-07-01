"use client";
import React, { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Props = {};

type testi = {
  _id: string;
  name: string;
  occupation: string;
  message: string;
};

const Testimonials = (props: Props) => {
  const [testimonials, setTestimonials] = React.useState<testi[]>([]);
  useEffect(() => {
    const testimo = async () => {
      const response = await fetch("/api/testimonials");
      const data = await response.json();
      setTestimonials(data);
      console.log(data);
    };
    testimo();
  }, []);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 24 });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <section className="lg:mt-12">
      <div className="py-24 w-4/5 mx-auto">
        <h2 className="pb-16 font-bold text-5xl text-gray-800 text-center">
          What Our Clients Say
        </h2>

        <div className="embla overflow-hidden flex" ref={emblaRef}>
          <div className="embla__container flex flex-row  gap-5 ">
            {testimonials.map((i, index) => (
              <Card
                key={i._id}
                className="w-full max-w-md bg-[url('/subtle-texture.png')] bg-cover bg-center p-6 shadow-lg"
              >
                <CardContent className="space-y-4">
                  <blockquote className="text-lg font-medium leading-relaxed">
                    {'"' + i.message + '"'}
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="https://avatar.iran.liara.r/boy?username=Ash" />
                      <AvatarFallback>
                        {i.name.split(" ")[0].split("")[0].toUpperCase()}{" "}
                        {i.name.split(" ")[1]?.split("")[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium"> {i.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {i.occupation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
