"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  GrFacebook,
  GrFacebookOption,
  GrGithub,
  GrInstagram,
  GrLinkedin,
  GrMail,
  GrTwitter,
  GrYoutube,
} from "react-icons/gr";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import { GiPhone } from "react-icons/gi";
import axios from "axios";

type Props = {};

const Footer = (props: Props) => {
  const [email, setEmail] = useState("");
  const handleEmail = async () => {
    try {
      const res = await axios.post("/api/email", { email });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <footer className="bg-primary py-7">
      <div
        className="
        container
        
        w-full
        flex flex-col flex-wrap
        px-4
        
        
        mx-auto
        md:items-center
        lg:items-start
        md:flex-row md:flex-nowrap
      "
      >
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <Link href={"/"} className="text-2xl text-white">
            {/* TODO Logo */}
            <Image src="/csen_logo_w.png" width={100} height={26} alt="logo" />
          </Link>
          <p className="mt-2 text-xs text-justify text-gray-300">
            {` Chez CSEN, notre passion pour l'innovation en génie civil se traduit
            par une solution d'analyse parasismique avancée, conforme aux normes
            Algériennes. Ensemble, construisons l'avenir avec des structures
            sûres, résilientes et optimales.`}
          </p>
          <div className="flex mt-4">
            <Input
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={email}
            />
            <Button onClick={handleEmail} variant="destructive">
              Subscribe
            </Button>
          </div>
          <div className="flex mt-4 space-x-4 lg:mt-2 text-xl">
            <Link
              href={"https://www.facebook.com/profile.php?id=61550225428516"}
            >
              <GrFacebookOption className="text-gray-100" />
            </Link>
            <Link
              href={"https://www.facebook.com/profile.php?id=61550225428516"}
            >
              <GrTwitter className="text-gray-100" />
            </Link>
            <Link
              href={"https://www.youtube.com/channel/UCVMN5tTizPkj2UN4Csj2MzQ"}
            >
              <GrYoutube className="text-gray-100" />
            </Link>
            <Link href={"https://www.linkedin.com/company/csen-dz"}>
              <GrLinkedin className="text-gray-100" />
            </Link>
            <Link href={"https://github.com/CSEN-Dz"}>
              <GrGithub className="text-gray-100" />
            </Link>
          </div>
        </div>
        <div className="justify-around items-center w-full mt-4 text-center lg:flex">
          <div className="w-full h-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-semibold tracking-widest text-gray-100">
              Partners
            </h2>
            <ul className="space-y-2 text-sm list-none">
              <li>
                <Link
                  href={"https://www.scte-dz.com/cms/"}
                  className="text-gray-300"
                >
                  SCTE
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-semibold tracking-widest text-gray-100">
              <Link href={"mailto:contact@csen-dz.com"}>
                <GrMail className="inline-block" /> contact@csen-dz.com
              </Link>
            </h2>
            <h2 className="mb-2 font-semibold tracking-widest text-gray-100">
              <Link href={"tel:+213 771 69 21 63"}>
                <GiPhone className="inline-block" /> +213 771 69 21 63
              </Link>
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <p className="text-center text-white  ">
          CSEN &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
