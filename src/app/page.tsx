import Image from "next/image";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import RpaSection from "@/components/RpaSection";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  // set scroll to smooth

  return (
    <>
      <Navbar />

      {/* hello world */}
      <Hero />
      <Partners />
      <RpaSection />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
}
