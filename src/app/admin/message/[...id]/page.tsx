"use client";
import React, { useEffect, useState, use } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, EnvelopeClosedIcon, PersonIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { User, formatDate, getInitials, getText } from "@/app/admin/types";
import EmailReplyDialog from "@/components/EmailReplyDialog";

export default function MessageDetailPage({ params }: { params: Promise<{ id: string[] }> }) {
  const resolvedParams = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const id = resolvedParams.id[0];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch single user by ID
        const response = await fetch(`/api/getData/${id}`);
        if (!response.ok) {
          // Fallback: fetch all and filter
          const allResponse = await fetch("/api/getData");
          const allData = await allResponse.json();
          const found = allData.find((u: User) => u._id === id);
          if (found) {
            setUser(found);
          } else {
            throw new Error("Message non trouvé");
          }
        } else {
          const data = await response.json();
          setUser(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 bg-gray-200 rounded-full" />
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded-xl" />
        ))}
      </div>
      <div className="h-40 bg-gray-100 rounded-xl" />
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <EnvelopeClosedIcon className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Message non trouvé</h2>
        <p className="text-gray-500 mb-6">{error || "Ce message n'existe pas ou a été supprimé."}</p>
        <Link href="/admin/message">
          <Button>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Retour aux messages
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Back button */}
      <Link href="/admin/message">
        <Button variant="ghost" className="gap-2 text-gray-600 hover:text-gray-900 -ml-2">
          <ArrowLeftIcon className="h-4 w-4" />
          Retour aux messages
        </Button>
      </Link>

      {/* Header Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <Avatar className="h-16 w-16 shadow-lg ring-4 ring-white">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl font-semibold">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <Badge className="w-fit bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
                  {user.userType}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard 
              icon={<EnvelopeClosedIcon className="h-5 w-5" />}
              label="Email"
              value={user.email}
            />
            <InfoCard 
              icon={<PersonIcon className="h-5 w-5" />}
              label="Téléphone"
              value={user.phoneNumber}
            />
            <InfoCard 
              icon={<HomeIcon className="h-5 w-5" />}
              label="Adresse"
              value={user.address}
            />
            <InfoCard 
              icon={<PersonIcon className="h-5 w-5" />}
              label={user.userType === "Étudiant" ? "Intérêt" : "Entreprise"}
              value={user.companyName || user.interest}
            />
          </div>
        </CardContent>
      </Card>

      {/* Message Card */}
      <Card className="shadow-lg border-0">
        <CardHeader className="border-b bg-gray-50/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Message</CardTitle>
            <span className="text-sm text-gray-500">
              Reçu le {formatDate(user.createdAt)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {getText(user.message)}
            </p>
          </div>
          
          {/* Interest */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Intéressé par</h4>
            <Badge variant="outline" className="text-sm px-3 py-1 bg-indigo-50 text-indigo-700 border-indigo-200">
              {getText(user.interest)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => setEmailDialogOpen(true)}
        >
          <EnvelopeClosedIcon className="h-4 w-4" />
          Répondre par email
        </Button>
      </div>

      {/* Email Reply Dialog */}
      {user && (
        <EmailReplyDialog
          open={emailDialogOpen}
          onOpenChange={setEmailDialogOpen}
          user={{
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            companyName: user.companyName,
            interest: getText(user.interest),
          }}
        />
      )}
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-gray-900 font-medium truncate" title={value}>
        {value || "—"}
      </p>
    </div>
  );
}
