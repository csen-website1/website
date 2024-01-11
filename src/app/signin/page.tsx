"use client";
import React, { useEffect, useState } from "react";
import Signin from "@/components/Signin";
import axios from "axios";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  const [data, setData] = useState<any[]>([]);

  const handleClick = () => {
    try {
      const fetchData = async () => {
        const response = await axios.get("/api/getdata");
        setData(response.data);
        fetchData();
      };
    } catch (err) {
      console.log(err);
    }
  };

  console.log(data);

  return (
    <div>
      <h2>hello</h2>
      <Signin />
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.email}</p>
        </div>
      ))}
      <button onClick={handleClick} className={buttonVariants()}>
        Get Data
      </button>
    </div>
  );
}
