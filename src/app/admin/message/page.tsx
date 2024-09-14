"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineMail } from "react-icons/ai";

type Props = {};

function Page({}: Props) {
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterByDate, setFilterByDate] = useState("");
  const [filterUser, setFilterUser] = useState<any>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("/api/getData");
        const data = await response.json();

        setUser(data);
        console.log(data);
      } catch (error: any) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, []);
  useEffect(() => {
    setFilterUser(
      User.filter((user: any) =>
        user.firstName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    setFilterUser(
      User.filter((user: any) =>
        user.createdAt.includes(filterByDate.toLowerCase())
      )
    );
  }, [filterByDate]);

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  // const filteredUser = User.filter((user: any) => {
  //   const userUpdatedAt = new Date(user.updatedAt);
  //   return userUpdatedAt >= lastWeek;
  // });

  return (
    <Tabs defaultValue="week">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilterIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <FileIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>
      <TabsContent value="week">
        <CardContent x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {User.map((user: any) => (
                  <TableRow className="bg-accent" key={user._id}>
                    <TableCell>
                      <div className="font-medium">
                        {user.firstName + user.lastName}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {user.email}
                      </div>
                      <br />
                    </TableCell>
                    <TableCell>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {user.phoneNumber}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {user.userType}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
                        Fulfilled
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.updatedAt.split("T")[0]}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/message/${user._id}`}>
                        {" "}
                        <AiOutlineMail />
                      </Link>
                      <button
                        onClick={() => {
                          fetch(`/api/getData/${user._id}`, {
                            method: "DELETE",
                          });
                        }}
                      >
                        <AiFillDelete className="text-red-600" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </CardContent>
      </TabsContent>
    </Tabs>
  );
}

function ListFilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}

export default Page;
