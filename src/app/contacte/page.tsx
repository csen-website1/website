import React from "react";
import Form from "@/components/Form";

type Props = {};

function page({}: Props) {
  return (
    <div className="h-screen flex-col flex justify-center items-center">
      {/* <h1 className="mx-auto">Register To RPA Plug-in</h1>
      <Form /> */}
      <h1 className="text-6xl font-semibold text-center">
        woriking on it <span className="text-red-500">🚧</span>
        please come back later <span className="text-red-500">🚧</span>
      </h1>
      <p className="text-destructive font-normal text-4xl my-7 text-center">
        Check the footer for contact informations{" "}
      </p>
    </div>
  );
}

export default page;
