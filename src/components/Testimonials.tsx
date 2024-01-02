"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

type Props = {};
const testimonials = [
  {
    testimonial:
      "I'm a huge fan of this app, I've found it to be incredibly intuitive overall. Would definitely recommend this if you're looking for an app to make planning that bit easier.",
    author: "John Doe",
    authorImg: "https://source.unsplash.com/v2aKnjMbP_k/500x500",
    authorMetadata: "Founder",
  },
  {
    testimonial:
      "This app has been pivotal for helping our team collaborate on tasks and new plans, I’d definitely recommend this if you’d like an intuitive planner app.",
    author: "Emma Doe",
    authorMetadata: "Founder",
    authorImg: "https://source.unsplash.com/rDEOVtE7vOs/500x500",
  },
  {
    testimonial:
      "I'm a huge fan of this app, I've found it to be incredibly intuitive overall. Would definitely recommend this if you're looking for an app to make planning that bit easier.",
    author: "John Doe",
    authorImg: "https://source.unsplash.com/v2aKnjMbP_k/500x500",
    authorMetadata: "Founder",
  },
  {
    testimonial:
      "This app has been pivotal for helping our team collaborate on tasks and new plans, I’d definitely recommend this if you’d like an intuitive planner app.",
    author: "Emma Doe",
    authorMetadata: "Founder",
    authorImg: "https://source.unsplash.com/rDEOVtE7vOs/500x500",
  },
  {
    testimonial:
      "I absolutely love the features provided, and that I can create notes to each task also. It really helped streamline my workflow, I would definitely recommend it!",
    author: "James Doe",
    authorImg: "https://source.unsplash.com/pUhxoSapPFA/500x500",
    authorMetadata: "Founder",
  },
];

const Testimonials = (props: Props) => {
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
          <div className="embla__container flex flex-row ">
            {testimonials.map((testimonialMetadata, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_33%] md:flex-[0_0_32%] mr-4 min-w-0
                    bg-white shadow-sm border-solid border-2 
                        border-gray-200 
                        rounded-lg"
              >
                <div
                  className="w-full flex flex-col bg-white px-6 py-6
              rounded-2xl "
                >
                  <p className="pt-2 text-slate-600 leading-relaxed">
                    {testimonialMetadata.testimonial}
                  </p>
                  <div className="flex flex-row pt-4 mt-2 items-center">
                    <img
                      className="rounded-full inline h-12 w-12 "
                      src={testimonialMetadata.authorImg}
                      alt="testimonial author"
                    />
                    <div className="flex flex-col ml-4">
                      <h2 className="font-semibold text-base">
                        {testimonialMetadata.author}
                      </h2>
                      <p className="text-gray-600">
                        {testimonialMetadata.authorMetadata}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div>
            <button
              type="button"
              className="mr-4 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center 
         "
              onClick={scrollPrev}
            >
              <RxArrowLeft />
              <span className="sr-only">Left arrow</span>
            </button>

            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center 
          inline-flex items-center"
              onClick={scrollNext}
            >
              <RxArrowRight />
              <span className="sr-only">Right arrow</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
