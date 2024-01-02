import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
interface Props {
  title: string;
  description?: string;
  icon: ReactNode;
  content?: string;
  footer?: string;
  styling?: string;
}

export default function CardItem({
  title,
  description,
  footer,
  icon,
  content,
  styling,
}: Props) {
  return (
    <Card
      key={title}
      className={cn(
        "lg:max-w-md w-full min-h-[350px] text-center mx-auto shadow-2xl bg-secondary ",
        styling
      )}
    >
      {icon && (
        <div className="flex justify-center items-center mt-3">{icon}</div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      {footer && (
        <CardFooter>
          <p>{footer}</p>
        </CardFooter>
      )}
    </Card>
  );
}
