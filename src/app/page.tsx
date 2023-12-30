import Image from "next/image";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import RpaSection from "@/components/RpaSection";
import Features from "@/components/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <RpaSection />
      <Features />
    </>
  );
}
