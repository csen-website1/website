"use client";
import * as React from "react";
import { useState } from "react";
import MaxWidthWraper from "./MaxWidthWraper";
import Link from "next/link";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

interface Props {}

function Navbar({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navRef = React.useRef<any>(null);
  useOnClickOutside(navRef, () => {
    setIsMenuOpen(false);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    {
      name: "RPA Plug-in",
      href: "#",
    },
    {
      name: "Télécharger",
      href: "#",
    },
    {
      name: "Contacte",
      href: "#",
    },
  ];
  return (
    <div className="relative  z-50">
      <div className="fixed inset-x-0 top-5 h-16  text-white">
        <MaxWidthWraper>
          <div className="mx-auto px-5 h-16 flex items-center justify-between rounded-xl shadow-lg backdrop-blur-md bg-primary/40 bg-blend-screen">
            <Link href="/">
              <Image
                src="/images/logoNav.png"
                width={100}
                height={100}
                alt="logo"
              />
            </Link>
            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <IoMdClose className="block sm:hidden" />
              ) : (
                <RxHamburgerMenu className="block sm:hidden" />
              )}
            </button>
            {isMenuOpen && (
              <ul
                ref={navRef}
                className="absolute flex flex-col top-20 right-0 bg-slate-50 p-5 gap-5 items-center"
              >
                {links.map((link) => (
                  <motion.li
                    whileTap={{ scale: 0.9 }}
                    className="inline-block mx-auto "
                    key={link.name}
                  >
                    <Link
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "hover:bg-transparent text-blue-900"
                      )}
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            )}
            <ul className="hidden sm:block">
              {links.map((link) => (
                <li className="inline-block ml-10" key={link.name}>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "hover:bg-transparent text-blue-900"
                    )}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </MaxWidthWraper>
      </div>
    </div>
  );
}

export default Navbar;
