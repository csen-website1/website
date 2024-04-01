import React from "react";
import CardItem from "./ui/Cards";

type Props = {};
import {
  GrTechnology,
  GiTechnoHeart,
  AiOutlineApartment,
  AiOutlineCloud,
  AiOutlineCodeSandbox,
} from "./ui/Icons";
import MaxWidthWraper from "./MaxWidthWraper";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IoMdDownload } from "react-icons/io";

const features = [
  {
    icon: <GrTechnology />,
    title: "Conforme à la Règlementation Algérienne",
    text: `Notre outil a été développé en étroite 
              collaboration avec des experts dans la conception parasismique des bâtiments et est totalement conforme aux normes 
              et aux règles parasismiques en vigueur en Algérie`,
  },
  {
    icon: <GiTechnoHeart />,
    title: "Analyse Précise",
    text: `L'automatisation intégrée garantit des calculs complexes et volumineux réalisés avec rapidité et précision, facilitant ainsi le processus pour les bureaux d'étude et au CTC de prendre des décisions informées pour la conception et la construction de bâtiments résistants aux séismes `,
  },
  {
    icon: <AiOutlineApartment />,
    title: "L'équilibre Résistance/Economie",
    text: "Notre solution offre une analyse parasismique de haute qualité associée à des propositions économiques optimales, trouvant l'équilibre parfait entre robustesse et coûts .",
  },
  {
    icon: <AiOutlineCloud />,
    title: "Calcul innovant",
    text: "Nous avons développé un calcul innovant pour les éléments soumis à la flexion composée (poteaux/voiles), une caractéristique unique dans notre solution.",
  },
  {
    icon: <AiOutlineCodeSandbox />,
    title: "La version Cloud de RPA Plug-in",
    text: "CSEN Cloud offre une expérience professionnelle complète, permettant une gestion fluide, une sauvegarde des données, une organisation optimale et un transfert facile des projets entre les membres du cloud ou d’un cloud a un autre.",
  },

  {
    icon: <GrTechnology />,
    title: "Connaissance Approfondie",
    text: "Grâce au mode d’emplois et aux tutoriels vidéo inclus, nos clients peuvent rapidement acquérir une connaissance approfondie de l'outil et de ses fonctionnalités.",
  },
];

function Features({}: Props) {
  return (
    <div>
      <MaxWidthWraper>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6 -scroll-my-48"
          id="download"
        >
          {features.map((feature, index) =>
            CardItem({
              title: feature.title,
              content: feature.text,
              icon: feature.icon,
              styling: "",
            })
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-6 shadow-lg  ">
          <Link
            href={"https://drive.google.com/file/d/1ZaKDtJqGzOjai1ab4n9WBoKbpm_716zp/view?usp=sharing"}
            className={buttonVariants()}
          >
            <IoMdDownload className="inline-block mr-2 animate-bounce" /> RPA
            Setup RPA Plug-in
          </Link>
          <Link
            href={"https://drive.google.com/file/d/1PUQkOYFZlNeQIqyzaLpvKbEuCnMHRHYY/view?usp=sharing"}
            className={cn(buttonVariants(), "")}
          >
            <IoMdDownload className="inline-block mr-2 animate-bounce" />
            {"Formulaire d'inscription "}
          </Link>
        </div>
      </MaxWidthWraper>
    </div>
  );
}

export default Features;
