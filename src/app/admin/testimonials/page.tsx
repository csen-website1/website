"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials");
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      const data = await response.json();
      setTestimonials(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const editTestimonial = async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        throw new Error("Failed to update testimonial");
      }
      alert("Testimonial updated successfully");
    } catch (error) {
      console.log(error);

    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
      }
      setTestimonials((prev) => prev.filter((t: any) => t._id !== id));
      alert("Testimonial deleted successfully");
    } catch (error) {
           console.log(error);

    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {loading ? (
        <div>Loading testimonials...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        testimonials.map(({ _id, message, name, occupation }: any) => (
          <Card key={_id} className="py-5 gap-3">
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">{message}</div>
              <div className="flex items-center gap-4">
                <Avatar className="border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>
                    {name.split(" ")[0].split("")[0].toUpperCase()}
                    {name.split(" ")[1]?.split("")[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-muted-foreground">
                    {occupation}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  editTestimonial(_id, {
                    message: "Updated message",
                    name: "Updated name",
                    occupation: "Updated occupation",
                  });
                }}
              >
                <PencilIcon className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => deleteTestimonial(_id)}
                variant="ghost"
                size="sm"
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))
      )}

      <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-end">
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>
    </div>
  );
}

function PencilIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
