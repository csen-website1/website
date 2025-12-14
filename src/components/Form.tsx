"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import MaxWidthWraper from "@/components/MaxWidthWraper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { EnvelopeOpenIcon, PieChartIcon } from "@radix-ui/react-icons";
import AlertComponent from "./AlertComponent";

// Motion components for framer-motion v12
const MotionDiv = motion.create("div");
const MotionForm = motion.create("form");

const schema = z.object({
  firstName: z
    .string()
    .min(1, "Le prénom est requis")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Le prénom ne doit contenir que des lettres"),
  lastName: z
    .string()
    .min(1, "Le nom est requis")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Le nom ne doit contenir que des lettres"),
  jobTitle: z.string().min(1, "Le titre du poste est requis"),
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer un email valide"),
  address: z.string().min(1, "L'adresse est requise"),
  phoneNumber: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .regex(/^[0-9]{10}$/, "Le numéro doit contenir exactement 10 chiffres"),
  userType: z.enum(["Agence", "Société", "Bureau d'étude", "Étudiant"]),
  companyName: z.string().optional(),
  interest: z.enum([
    "La numérisation & l'automatisation",
    "Le cryptage & la sécurité des données",
    "La version Premium de RPA Plug-in",
    "La version Cloud de RPA Plug-in",
  ]),
  message: z.string().min(1, "Le message est requis"),
});

// Infer type from Zod schema to keep types in sync
type ContactFormData = z.infer<typeof schema>;

const Form = () => {
  const [formData, setFormData] = useState<ContactFormData>({
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
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [res, setRes] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);
  const [state, setState] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  const watchedUserType = watch("userType");

  useEffect(() => {
    setFormData((prevFormData: ContactFormData) => ({
      ...prevFormData,
      userType: watchedUserType,
    }));
  }, [watchedUserType]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitting(true);
      const response = await axios.post("/api/submit", data);
      setRes(response.data.message);
      setState(true);
    } catch (e: unknown) {
      console.error(e);
      if (axios.isAxiosError(e) && e.response) {
        setRes(e.response.data.message);
      } else {
        setRes("Une erreur s'est produite");
      }
      setState(false);
    } finally {
      setSubmitting(false);
      setTimeout(() => {
        setAlert(true);
      }, 500);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
      reset();
    }
  };

  const inputVariants = {
    focus: { scale: 1.01, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)" },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const showCompanyField = watchedUserType && ["Agence", "Société", "Bureau d'étude"].includes(watchedUserType);

  return (
    <>
      <div className="my-24 px-4">
        <MaxWidthWraper>
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Contactez-nous
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.
            </p>
          </MotionDiv>

          <MotionForm
            onSubmit={handleSubmit(onSubmit)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100"
          >
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <MotionDiv variants={itemVariants} className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  Prénom <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Votre prénom"
                  {...register("firstName")}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.firstName.message}
                  </p>
                )}
              </MotionDiv>

              <MotionDiv variants={itemVariants} className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Nom <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Votre nom"
                  {...register("lastName")}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.lastName.message}
                  </p>
                )}
              </MotionDiv>
            </div>

            {/* Job Title */}
            <MotionDiv variants={itemVariants} className="mb-6 space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                Titre du poste <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="jobTitle"
                placeholder="Ex: Ingénieur, Architecte..."
                {...register("jobTitle")}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.jobTitle ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.jobTitle.message}
                </p>
              )}
            </MotionDiv>

            {/* Email & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <MotionDiv variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="votre@email.com"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </MotionDiv>

              <MotionDiv variants={itemVariants} className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                  Numéro de téléphone <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  placeholder="0612345678"
                  {...register("phoneNumber")}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.phoneNumber ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </MotionDiv>
            </div>

            {/* Address */}
            <MotionDiv variants={itemVariants} className="mb-6 space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Adresse <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="address"
                placeholder="Votre adresse complète"
                {...register("address")}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.address.message}
                </p>
              )}
            </MotionDiv>

            {/* User Type & Company Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <MotionDiv variants={itemVariants} className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium text-gray-700">
                  Vous êtes <span className="text-red-500">*</span>
                </Label>
                <select
                  id="userType"
                  {...register("userType")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer"
                >
                  <option value="Agence">Agence</option>
                  <option value="Société">Société</option>
                  <option value="Bureau d'étude">Bureau d&apos;étude</option>
                  <option value="Étudiant">Étudiant</option>
                </select>
                {errors.userType && (
                  <p className="text-red-500 text-xs mt-1">{errors.userType.message}</p>
                )}
              </MotionDiv>

              {showCompanyField && (
                <MotionDiv
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-2"
                >
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    Nom de {formData.userType === "Agence" ? "l'agence" : formData.userType === "Société" ? "la société" : "le bureau"}
                  </Label>
                  <Input
                    type="text"
                    id="companyName"
                    placeholder={`Nom de votre ${formData.userType?.toLowerCase() || "organisation"}`}
                    {...register("companyName")}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
                  )}
                </MotionDiv>
              )}
            </div>

            {/* Interest */}
            <MotionDiv variants={itemVariants} className="mb-6 space-y-2">
              <Label htmlFor="interest" className="text-sm font-medium text-gray-700">
                Vous êtes intéressé par <span className="text-red-500">*</span>
              </Label>
              <select
                id="interest"
                {...register("interest")}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer"
              >
                <option value="La numérisation & l'automatisation">
                  La numérisation &amp; l&apos;automatisation
                </option>
                <option value="Le cryptage & la sécurité des données">
                  Le cryptage &amp; la sécurité des données
                </option>
                <option value="La version Premium de RPA Plug-in">
                  La version Premium de RPA Plug-in
                </option>
                <option value="La version Cloud de RPA Plug-in">
                  La version Cloud de RPA Plug-in
                </option>
              </select>
              {errors.interest && (
                <p className="text-red-500 text-xs mt-1">{errors.interest.message}</p>
              )}
            </MotionDiv>

            {/* Message */}
            <MotionDiv variants={itemVariants} className="mb-8 space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="message"
                rows={5}
                placeholder="Décrivez votre projet ou vos besoins..."
                {...register("message")}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.message ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.message.message}
                </p>
              )}
            </MotionDiv>

            {/* Submit Button */}
            <MotionDiv
              variants={itemVariants}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
            >
              <Button
                type="submit"
                disabled={submitting}
                className={`w-full py-4 px-6 text-base font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                } text-white`}
              >
                {submitting ? (
                  <>
                    <PieChartIcon className="w-5 h-5 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <EnvelopeOpenIcon className="w-5 h-5" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </MotionDiv>
          </MotionForm>

          <AlertComponent alert={alert} state={state} text={res} />
        </MaxWidthWraper>
      </div>
    </>
  );
};

export default Form;
