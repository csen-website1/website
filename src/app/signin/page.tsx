"use client";
import React, { useEffect, useState } from "react";
import Signin from "@/components/Signin";
import axios from "axios";
import { response } from "express";

export default function Page() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/getdata");
      setData(response.data);
    };

    fetchData();
  }, [response]);

  console.log(data);

  return (
    <div>
      <h2>hello</h2>
      <Signin />
    </div>
  );
}
