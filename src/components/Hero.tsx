import React from "react";
import MaxWidthWraper from "./MaxWidthWraper";
import Image from "next/image";
import AnimatedText from "./ui/AnimatedText";
import { Button } from "./ui/button";

type Props = {};

function Hero({}: Props) {
  return (
    <div className="bg-[url(/images/background.svg)] bg-no-repeat bg-cover bg-center bg-muted  ">
      <div className="flex justify-center items-center min-h-screen ">
        <MaxWidthWraper className="h-full">
          <div className="flex flex-col md:flex-row items-center h-full z-10 relative text-center ">
            <div className="flex flex-col  basis-full sm:basis-3/6 sm:mt-20  sm:px-0 px-5 mt-24">
              <h1
                id={"hero"}
                className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl my-4 "
              >
                <span className="">
                  With
                  <AnimatedText
                    className="text-primary font-medium"
                    text="CSEN "
                    duration={3}
                  />
                  Innovating Structural Analysis,
                  <div>
                    {" "}
                    <AnimatedText
                      className="text-primary inline-block font-medium px-1/2  "
                      text="Securing "
                    />{" "}
                    <AnimatedText
                      className=" inline-block font-medium px-1/2 "
                      text="Tomorrow"
                      duration={2}
                    />
                  </div>
                </span>
              </h1>
              <p className="leading-7 [&:not(:first-child)]:mt-6   font-medium">
                {`CSEN s'engage à propulser le génie civil algérien vers de
                nouveaux sommets en fournissant des outils technologiques de
                pointe pour l'analyse et la conception de constructions
                résistantes aux séismes en Algérie. Notre dévouement à
                l'innovation et à l'excellence garantit que nos solutions
                permettent aux ingénieurs et aux parties prenantes de créer des
                structures résilientes conformes aux réglementations
                parasismiques, contribuant à la sécurité et à la durabilité des
                projets de construction en Algérie.`}
              </p>
              <div className="mt-10 flex flex-col w-full items-center sm:space-x-4">
                <Button className="mx-auto " variant={"outline"}>
                  Get Started
                </Button>
              </div>
            </div>
            <div className="basis-full sm:basis-3/6   ">
              <Image
                src="/images/RPA Plug-in.png"
                width={1999}
                height={1074}
                alt="RPA Plug-in"
                className="rpa-image"
              />
            </div>
          </div>
        </MaxWidthWraper>
      </div>
    </div>
  );
}

export default Hero;
