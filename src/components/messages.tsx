"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { FileIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import Link from "next/link";

type Props = {};

function Emails({}: Props) {
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("/api/getData");
        const data = await response.json();

        setUser(data);
      } catch (error: any) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, []);

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
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {User.slice(0, 10).map((user: any) => (
                  <TableRow className="bg-accent" key={user._id}>
                    <TableCell>
                      <div className="font-medium">
                        {user.firstName + user.lastName}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {user.email}
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
                      {user.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/message/${user._id}`}>
                        {" "}
                        check messages
                      </Link>
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

export default Emails;

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
