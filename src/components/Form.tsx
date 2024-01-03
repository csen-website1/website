"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver
import axios from "axios";
import MaxWidthWraper from "@/components/MaxWidthWraper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

interface FormData {
  interest: string;
  userType: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  address: string;
  phoneNumber: string;
  companyName?: string;
  message: string;
}

const schema = z.object({
  firstName: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/),
  lastName: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/),
  jobTitle: z.string().min(1),
  email: z
    .string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  address: z.string().min(1),
  phoneNumber: z
    .string()
    .min(1)
    .regex(/^[0-9]{10}$/),
  userType: z.enum(["Agence", "Société", "Bureau d'étude", "Etudiant"]),
  companyName: z.string().min(1).optional(),
  interest: z.enum([
    "La numérisation & l'automatisation",
    "Le cryptage & la sécurité des données",
    "La version Premium de RPA Plug-in",
    "La version Cloud de RPA Plug-in",
  ]),
  message: z.string().min(1),
});

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    interest: "La numérisation & l'automatisation",
    userType: "Agence",
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    address: "",
    phoneNumber: "",
    companyName: "",
    message: "",
  });
  const [error, setEror] = useState<String>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      userType: watch("userType"),
    }));
  }, [watch("userType")]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/submit", data);
      console.log(response.data);
    } catch (error: any) {
      console.error(error);
      setEror(error.response.data);
    } finally {
    }
  };

  return (
    <>
      <div className="my-24">
        <div>
          <MaxWidthWraper>
            <form onSubmit={handleSubmit(onSubmit)} className="shadow-md p-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 gap-4">
                  <Label htmlFor="firstName" className="block mb-2">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className="w-full p-2 mb-4"
                  />
                  {errors.firstName && (
                    <span className="text-red-500">First Name is required</span>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <Label htmlFor="lastName" className="block mb-2">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className="w-full p-2 mb-4"
                  />
                  {errors.lastName && (
                    <span className="text-red-500">Last Name is required</span>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="jobTitle" className="block mb-2">
                  Job Title
                </Label>
                <Input
                  type="text"
                  id="jobTitle"
                  {...register("jobTitle")}
                  className="w-full p-2"
                />
                {errors.jobTitle && (
                  <span className="text-red-500">Job Title is required</span>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="email" className="block mb-2">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full p-2"
                />
                {errors.email && (
                  <span className="text-red-500">Invalid Email</span>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="address" className="block mb-2">
                  Address
                </Label>
                <Input
                  type="text"
                  id="address"
                  {...register("address")}
                  className="w-full p-2"
                />
                {errors.address && (
                  <span className="text-red-500">Address is required</span>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="phoneNumber" className="block mb-2">
                  Phone Number
                </Label>
                <Input
                  type="text"
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  className="w-full p-2"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500">Phone Number is required</span>
                )}
              </div>
              <div className="mb-4">
                <Label className="block mb-2">Vous êtes:</Label>
                <div className="flex">
                  {["Agence", "Société", "Bureau d'étude", "Etudiant"].map(
                    (userType) => (
                      <div key={userType}>
                        <Input
                          type="radio"
                          id={userType.toLowerCase()}
                          value={userType}
                          {...register("userType")}
                          className="mr-2 scale-50"
                        />
                        <Label
                          htmlFor={userType.toLowerCase()}
                          className="mr-4"
                        >
                          {userType}
                        </Label>
                      </div>
                    )
                  )}
                </div>
                {errors.userType && (
                  <span className="text-red-500">User Type is required</span>
                )}
              </div>
              {watch("userType") &&
                ["Agence", "Société", "Bureau d'étude"].includes(
                  watch("userType")
                ) && (
                  <div className="mb-4">
                    <Label htmlFor="companyName" className="block mb-2">
                      The name of {formData.userType}
                    </Label>
                    <Input
                      type="text"
                      id="companyName"
                      {...register("companyName")}
                      className="w-full p-2"
                    />
                    {errors.companyName && (
                      <span className="text-red-500">
                        Additional Info is required
                      </span>
                    )}
                  </div>
                )}
              <div className="mb-4">
                <Label className="block mb-2">Vous êtes intéressé par:</Label>
                <div className="flex flex-col">
                  {[
                    "La numérisation & l'automatisation",
                    "Le cryptage & la sécurité des données",
                    "La version Premium de RPA Plug-in",
                    "La version Cloud de RPA Plug-in",
                  ].map((interest) => (
                    <div key={interest}>
                      <Input
                        type="radio"
                        id={interest.toLowerCase().replace(/ /g, "-")}
                        value={interest}
                        {...register("interest")}
                        className="scale-50"
                      />
                      <Label
                        htmlFor={interest.toLowerCase().replace(/ /g, "-")}
                        className="mr-4"
                      >
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.interest && (
                  <span className="text-red-500">Interest is required</span>
                )}
              </div>
              <div className="mb-4">
                <Label htmlFor="message" className="block mb-2">
                  Message
                </Label>
                <textarea
                  id="message"
                  {...register("message")}
                  className="w-full p-2"
                ></textarea>
                {errors.message && (
                  <span className="text-red-500">Message is required</span>
                )}
              </div>
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
              >
                Submit
              </Button>
            </form>
          </MaxWidthWraper>
        </div>
      </div>
    </>
  );
};

export default Form;
