"use client";
import React from "react";
import MaxWidthWraper from "./MaxWidthWraper";
import Link from "next/link";
import { Separator } from "./ui/separator";

type Props = {};

const Partners = (props: Props) => {
  return (
    <div className="my-20 bg-slate-200">
      <MaxWidthWraper>
        <div>
          <h2 className="scroll-m-20 py-10 border-y  text-4xl sm:text-5xl font-semibold tracking-tight first:mt-0 text-center">
            Our Partners
          </h2>
          <div>
            <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center">
              <div className="sm:w-1/3 md:1/2 p-2 flex items-center justify-center grayscale hover:grayscale-0 hover:scale-105 transition-all">
                <Link href={"#"}>
                  <img
                    className="w-full scale-50"
                    src="/Logo Partners/SCTE.png"
                    alt="Partner"
                  />
                </Link>
              </div>

              <div className="sm:w-1/3 md:1/2 p-2 flex items-center justify-center grayscale hover:grayscale-0 hover:scale-105 transition-all">
                <Link href={"#"}>
                  <img
                    className="w-full "
                    src="/Logo Partners/ANPT.png"
                    alt="Partner"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWraper>
    </div>
  );
};

export default Partners;
