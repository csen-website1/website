"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import e from "express";

export default function CreateTesto() {
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Testimonial created successfully");
        setFormData({
          name: "",
          occupation: "",
          message: "",
        });
      } else {
        alert("Failed to create testimonial");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create testimonial");
    }
  };
  return (
    <Card className="w-full max-w-md bg-[url('/subtle-texture.png')] bg-cover bg-center p-6 shadow-lg">
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Create Testimonial</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter the name"
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                value={formData.name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Enter the company"
                onChange={(e) => {
                  setFormData({ ...formData, occupation: e.target.value });
                }}
                value={formData.occupation}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="testimonial">Testimonial</Label>
              <Textarea
                id="testimonial"
                placeholder="Enter the testimonial"
                rows={4}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                }}
                value={formData.message}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Testimonial
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
