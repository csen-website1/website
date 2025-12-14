"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, PaperPlaneIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  emailTemplates,
  applyTemplatePlaceholders,
  getTemplateById,
} from "@/lib/emailTemplates";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  interest: string;
}

interface EmailReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserData;
}

export default function EmailReplyDialog({
  open,
  onOpenChange,
  user,
}: EmailReplyDialogProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState("thank-you");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load template when selection changes
  useEffect(() => {
    const template = getTemplateById(selectedTemplateId);
    if (template) {
      setSubject(applyTemplatePlaceholders(template.subject, user));
      setBody(applyTemplatePlaceholders(template.body, user));
    }
  }, [selectedTemplateId, user]);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setSent(false);
      setError(null);
      setSelectedTemplateId("thank-you");
    }
  }, [open]);

  const handleSend = async () => {
    try {
      setSending(true);
      setError(null);

      const response = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user.email,
          subject,
          body,
          firstName: user.firstName,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      setSent(true);
      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Répondre par email</DialogTitle>
          <DialogDescription>
            Envoyer un email à{" "}
            <span className="font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </span>{" "}
            ({user.email})
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email envoyé !
            </h3>
            <p className="text-gray-500">
              Votre message a été envoyé à {user.email}
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Template Selector */}
            <div className="space-y-2">
              <Label htmlFor="template">Modèle d&apos;email</Label>
              <Select
                value={selectedTemplateId}
                onValueChange={setSelectedTemplateId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un modèle" />
                </SelectTrigger>
                <SelectContent>
                  {emailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Sujet de l'email"
                className="font-medium"
              />
            </div>

            {/* Body */}
            <div className="space-y-2">
              <Label htmlFor="body">Message</Label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contenu de l'email..."
              />
            </div>

            {/* Recipient info */}
            <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              <span className="font-medium">Destinataire :</span> {user.email}
            </div>
          </div>
        )}

        {!sent && (
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={sending}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSend}
              disabled={sending || !subject.trim() || !body.trim()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {sending ? (
                <>
                  <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
                  Envoi...
                </>
              ) : (
                <>
                  <PaperPlaneIcon className="mr-2 h-4 w-4" />
                  Envoyer
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
