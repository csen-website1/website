"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import MaxWidthWraper from "./MaxWidthWraper";
import Link from "next/link";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

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
  const [data, setDate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/layout");
        const resData = res.json();
        setData(resData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const links = [
    {
      name: "RPA Plug-in",
      href: "#plugin",
    },
    {
      name: "",
      href: " ",
    },

    {
      name: "Contact",
      href: "/contact",
    },
  ];
  const components: { title: string; href: string; description: string }[] = [
    {
      title: " Setup RPA Plug-in",
      href: data?.downloadUrl,
      description: "Le Fichie D'installation .",
    },
    {
      title: "Fiche Descriptive",
      href: data?.fichDesUrl,
      description: "Documenet PDF pour consulter le sommaire du logiciel .",
    },
  ];
  return (
    <div className="relative  z-50">
      <div className="fixed inset-x-0 top-5 h-16  text-white">
        <MaxWidthWraper>
          <div className="mx-auto px-5 h-16 flex items-center justify-between rounded-xl shadow-lg backdrop-blur-md bg-slate-100/30 bg-blend-difference">
            <div className="w-[100px] h-[26px] relative">
              <Link href="/">
                <Image src="/csen_logo_b.png" fill alt="logo" />
              </Link>
            </div>

            <button onClick={toggleMenu}>
              {isMenuOpen ? (
                <IoMdClose className="block sm:hidden text-neutral-900" />
              ) : (
                <RxHamburgerMenu className="block sm:hidden text-neutral-900" />
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
                <li></li>
              </ul>
            )}
            <NavigationMenu className="text-black hidden sm:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Get Started
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="#plugin"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              RPA Plug-in
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Logiciel d’analyse des structures en Béton Armé
                              selon les DTR Algérien Travail en collaboration
                              avec CSI-ETABS.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="#plugin" title="Introduction">
                        Avec notre solution qui est basée sur la numérisation
                        des DTR {"et l'automatisation "}du calcul nous pouvons à
                        la fois augmenter la croissance de la productive ainsi
                        qu’arrivé à une étude parasismique qui est conforme à la
                        règlementation {"locale d'une manière"} précise, rapide
                        et fiable tout en choisissant la meilleure proposition
                        économique.
                      </ListItem>
                      <ListItem href="#video" title="Installation">
                        {"Commencez le processus d'installation de RPA Plugin."}
                      </ListItem>
                      {/* <ListItem
                        href="/docs/primitives/typography"
                        title="Typography"
                      >
                        Styles for headings, paragraphs, lists...etc
                      </ListItem> */}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-black">
                    Télécharger
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={"text-black"}>
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </MaxWidthWraper>
      </div>
    </div>
  );
}

export default Navbar;
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
