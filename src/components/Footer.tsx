import Link from "next/link";
import React from "react";
import {
  GrFacebook,
  GrFacebookOption,
  GrInstagram,
  GrLinkedin,
  GrTwitter,
  GrYoutube,
} from "react-icons/gr";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-primary">
      <div
        className="
        container
        flex flex-col flex-wrap
        px-4
        py-16
        mx-auto
        md:items-center
        lg:items-start
        md:flex-row md:flex-nowrap
      "
      >
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <Link href={"/"} className="text-2xl text-white">
            {/* TODO Logo */}
          </Link>
          <p className="mt-2 text-xs text-justify text-gray-400">
            Chez CSEN, notre passion pour l'innovation en génie civil se traduit
            par une solution d'analyse parasismique avancée, conforme aux normes
            Algériennes. Ensemble, construisons l'avenir avec des structures
            sûres, résilientes et optimales.
          </p>
          <div className="flex mt-4">
            <Input type="email" placeholder="Email" />
            <Button variant="destructive">Subscribe</Button>
          </div>
          <div className="flex mt-4 space-x-4 lg:mt-2 text-xl">
            <Link href={""}>
              <GrFacebookOption className="text-gray-100" />
            </Link>
            <Link href={""}>
              <GrTwitter className="text-gray-100" />
            </Link>
            <Link href={""}>
              <GrYoutube className="text-gray-100" />
            </Link>
            <Link href={""}>
              <GrLinkedin className="text-gray-100" />
            </Link>
          </div>
        </div>
        <div className="justify-between w-full mt-4 text-center lg:flex">
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Quick Links
            </h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 1
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 2
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 3
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 4
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Quick Links
            </h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 1
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 2
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 3
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 4
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 lg:w-1/3 md:w-1/2">
            <h2 className="mb-2 font-bold tracking-widest text-gray-100">
              Quick Links
            </h2>
            <ul className="mb-8 space-y-2 text-sm list-none">
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 1
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 2
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 3
                </Link>
              </li>
              <li>
                <Link href={"/"} className="text-gray-300">
                  Link 4
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center -mt-12">
        <p className="text-center text-white pb-2">
          CSEN &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
