import { GiTechnoHeart as IconGiTechnoHeart } from "react-icons/gi";
import { GrTechnology as IconGrTechnology } from "react-icons/gr";
import {
  AiOutlineApartment as IconAiOutlineApartment,
  AiOutlineCloud as IconAiOutlineCloud,
  AiOutlineCodeSandbox as IconAiOutlineCodeSandbox,
} from "react-icons/ai";

const GrTechnology = (props: React.SVGProps<SVGSVGElement>) => (
  <IconGrTechnology {...props} className={"w-12 h-12 text-primary"} />
);
const GiTechnoHeart = (props: React.SVGProps<SVGSVGElement>) => (
  <IconGiTechnoHeart {...props} className={"w-12 h-12 text-primary"} />
);
const AiOutlineApartment = (props: React.SVGProps<SVGSVGElement>) => (
  <IconAiOutlineApartment {...props} className={"w-12 h-12 text-primary"} />
);
const AiOutlineCloud = (props: React.SVGProps<SVGSVGElement>) => (
  <IconAiOutlineCloud {...props} className={"w-12 h-12 text-primary"} />
);
const AiOutlineCodeSandbox = (props: React.SVGProps<SVGSVGElement>) => (
  <IconAiOutlineCodeSandbox {...props} className={"w-12 h-12 text-primary"} />
);

export {
  GrTechnology,
  GiTechnoHeart,
  AiOutlineApartment,
  AiOutlineCloud,
  AiOutlineCodeSandbox,
};
