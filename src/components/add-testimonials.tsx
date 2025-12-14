"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusIcon, CheckIcon } from "@radix-ui/react-icons";

export default function CreateTesto() {
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.occupation.trim() || !formData.message.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Erreur lors de la création");
      
      setSuccess(true);
      setFormData({ name: "", occupation: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <PlusIcon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Nouveau témoignage</CardTitle>
            <p className="text-blue-100 text-sm">Ajoutez un témoignage client</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              <CheckIcon className="h-4 w-4" />
              Témoignage créé avec succès !
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Nom <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Ex: Jean Dupont"
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="occupation" className="text-gray-700 font-medium">
              Fonction / Entreprise <span className="text-red-500">*</span>
            </Label>
            <Input
              id="occupation"
              placeholder="Ex: Directeur, ABC Corp"
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="message" className="text-gray-700 font-medium">
                Témoignage <span className="text-red-500">*</span>
              </Label>
              <span className="text-xs text-gray-400">
                {formData.message.length}/500
              </span>
            </div>
            <Textarea
              id="message"
              placeholder="Écrivez le témoignage ici..."
              rows={4}
              maxLength={500}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Création en cours...
              </>
            ) : (
              <>
                <PlusIcon className="mr-2 h-4 w-4" />
                Créer le témoignage
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
