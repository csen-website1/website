"use client";
import MessageBased from "@/components/component/message-based";
import React from "react";
import { useEffect, useState } from "react";

type Props = {};

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>([{ message: [] }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterUser, setFilterUser] = useState<any>([]);
  const id = params.id[0];

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
        // setLoading(false);
      }
    };
    fetchEmails();
  }, [params.id]);
  console.log(filterUser);
  useEffect(() => {
    console.log(user);
    setFilterUser(user.filter((user: any) => user._id === id));
    if (filterUser) {
      setLoading(false);
    }
  }, [params.id, user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {" "}
      <MessageBased
        name={filterUser[0]?.firstName + " " + filterUser[0]?.lastName}
        type={filterUser[0]?.userType}
        message={filterUser[0]?.message}
      />
    </div>
  );
}
