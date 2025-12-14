"use client";
import React from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  HomeIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon,
  GearIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

// Navigation items configuration
const navItems = [
  { href: "/admin", icon: HomeIcon, label: "Dashboard", exact: true },
  { href: "/admin/message", icon: EnvelopeClosedIcon, label: "Messages", exact: false },
  { href: "/admin/testimonials", icon: ChatBubbleIcon, label: "Témoignages", exact: false },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  // Get breadcrumb items based on current path
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const items: { label: string; href?: string }[] = [];

    if (segments[0] === "admin") {
      items.push({ label: "Dashboard", href: "/admin" });
      
      if (segments[1] === "message") {
        items.push({ label: "Messages", href: "/admin/message" });
        if (segments[2]) {
          items.push({ label: "Détail du message" });
        }
      } else if (segments[1] === "testimonials") {
        items.push({ label: "Témoignages" });
      }
    }

    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-white/80 backdrop-blur-md sm:flex shadow-sm">
        <nav className="flex flex-col items-center gap-3 px-2 py-4">
          {/* Logo */}
          <Link
            href="/admin"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <span className="text-lg">R</span>
          </Link>

          <div className="w-8 h-px bg-gray-200 my-2" />

          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                        active
                          ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>

        {/* Bottom nav */}
        <nav className="mt-auto flex flex-col items-center gap-3 px-2 py-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
                >
                  <GearIcon className="h-5 w-5" />
                  <span className="sr-only">Paramètres</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                Paramètres
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* Main content area with header */}
      <div className="flex flex-col sm:pl-16">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-4 sm:px-6 shadow-sm">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="sm:hidden">
                <HamburgerMenuIcon className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <nav className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 font-bold text-lg"
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                      R
                    </div>
                    <span>RPA Admin</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-4">
                  {navItems.map((item) => {
                    const active = isActive(item.href, item.exact);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                          active
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Breadcrumb */}
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.href || `breadcrumb-${index}`}>
                  <BreadcrumbItem>
                    {item.href && index < breadcrumbs.length - 1 ? (
                      <BreadcrumbLink asChild>
                        <Link href={item.href} className="hover:text-blue-600 transition-colors">
                          {item.label}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="font-medium">{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Search & User */}
          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden md:block">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-9 w-64 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:opacity-90"
                >
                  <PersonIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Paramètres</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>
    </>
  );
}
