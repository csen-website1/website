"use client";
import React, { useEffect, useRef } from "react";
import MaxWidthWraper from "./MaxWidthWraper";
import { useAnimation, useInView, motion } from "framer-motion";
import CardItem from "./ui/Cards";
import Link from "next/link";

interface Props {}

const products = [
  {
    title: "RPA Premium",
    description:
      "Notre produit phare offre une analyse parasismique avancée pour les structures en béton armé, en mettant particulièrement l'accent sur le bon équilibre entre la robustesse structurelle et la rentabilité. Nous insistons particulièrement sur l'application stricte des critères imposés par le code, la convergence vers un dimensionnement optimal, la fourniture de ratios de vérification ainsi que des suggestions. Tout cela est réalisé avec des méthodes innovantes tout en gardant l'esprit de l'actualité, assurant ainsi une approche complète et à la pointe de la technologie pour une conception parasismique meilleur.",
    icon: (
      <img
        className="h-1/2 w-1/2 sm:h-1/4 sm:w-1/4 md:h-1/4 md:w-1/4 lg:h-1/4 lg:w-1/4 xl:h-1/4 xl:w-1/2"
        src="/images/logo3.png"
        alt=""
      />
    ),
  },
  {
    title: "RPA Cloud",
    description:
      "La version Cloud offre une expérience collaborative avancée en combinant une structure organisationnelle élaborée avec trois catégories d'utilisateurs. Les utilisateurs autorisés peuvent télécharger les projets existants du Cloud vers leur machine locale, favorisant la collaboration et le partage d'informations. En parallèle, la flexibilité est préservée avec la possibilité de transférer des projets entre différents Clouds, facilitant une collaboration transparente et efficace entre les utilisateurs et d'un Cloud a un autre. Cette combinaison offre une gestion fluide, sécurisée et flexible des projets au sein de la version Cloud.",
    icon: (
      <img
        className="h-1/2 w-1/2 sm:h-1/4 sm:w-1/4 xl:w-1/2"
        src="/images/Logo2.png"
        alt="La version Cloud"
      />
    ),
  },
];
const RpaSection = (props: Props) => {
  const controls = useAnimation();
  const [videoUrl, setVideoUrl] = React.useState("");
  const [fichDesUrl, setFichDesUrl] = React.useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/layout");
        if (res.ok) {
          const data = await res.json();
          setVideoUrl(data[0].videoUrl);
          setFichDesUrl(data[0].fichDesUrl);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref);
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (inView) {
      timeoutId = setTimeout(() => {
        controls.start("visible");
      }, 500); // Delay animation start by 500ms
    } else {
      controls.start("hidden");
    }

    return () => clearTimeout(timeoutId);
  }, [controls, inView]);

  return (
    <div className="bg-primary/15 py-16">
      <MaxWidthWraper>
        <motion.div
          className="flex justify-center items-center"
          variants={item}
          initial="hidden"
          animate={controls}
          ref={ref}
        >
          <img
            className="w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 sm:my-10 my-3"
            src="/images/logo3.png"
            alt=""
          />
        </motion.div>
        <div>
          <h2 className="scroll-m-20 py-10 border-y  text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0 text-center">
            {`Logiciel d’analyse des structures en Béton Armé selon les DTR
            Algérien Travail en collaboration avec CSI-ETABS`}
          </h2>
          <p id="plugin" className="text-center font-light">
            {` Avec notre solution qui est basée sur la numérisation des DTR et
            l'automatisation du calcul nous pouvons à la fois augmenter la
            croissance de la productive ainsi qu’arrivé à une étude parasismique
            qui est conforme à la règlementation locale d'une manière précise,
            rapide et fiable tout en choisissant la meilleure proposition
            économique.`}
          </p>
        </div>
        <div
          id="introduction"
          className="grid grid-cols-1 md:grid-cols-2 my-24 mx-auto w-full gap-6"
        >
          {products.map((product, index) => (
            <CardItem
              {...product}
              styling="hover:border-4 transition-all border-primary/35 border hover:scale-105"
              key={index}
            />
          ))}
        </div>
        <h3 className="text-center text-3xl my-9">
          Besoin plus de detail ?{" "}
          <Link
            href={
              fichDesUrl
                ? fichDesUrl
                : "https://drive.google.com/file/d/1fUAGST-Euq8_933g-68N5U_S2XbAKSf-/view"
            }
            className="text-primary/50"
          >
            {" "}
            Telecharger la fiche descriptive
          </Link>
        </h3>
        <iframe
          id="video"
          className="mx-auto  bg-slate-500  w-full aspect-video  my-4"
          src={
            videoUrl
              ? videoUrl
              : "https://www.youtube.com/embed/0-fNsVeN6ig?si=3mWbXY1sYHpgD_IN"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </MaxWidthWraper>
    </div>
  );
};

export default RpaSection;
