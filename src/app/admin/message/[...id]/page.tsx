"use client";
import React from "react";
import { useEffect, useState } from "react";

type Props = {};

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>([{ message: [] }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterUser, setFilterUser] = useState([]);

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
  }, [params.id]);

  useEffect(() => {
    console.log(user);
    console.log(params.id);
    setFilterUser(user?.filter((msg: any) => msg._id === params.id[0]));

    console.log(filterUser);
  }, [user]);

  return (
    <div>
      {filterUser?.map((user: any) => (
        <div
          className="flex items-center p-10 gap-3 bg-slate-200"
          key={user.id}
        >
          <h2>{`${user.firstName}  ${user.lastName}`}</h2>
          <p>{user.userType}</p>
          <p>messages : </p>
          <ul>
            {user.message.map((msg: any, index: number) => (
              <li key={index}>
                {msg.text} <br />
                {msg.date}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
