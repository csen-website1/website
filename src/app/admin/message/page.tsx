"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FileIcon, MagnifyingGlassIcon, TrashIcon, EnvelopeOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { User, filterByDateRange, formatDate, getInitials } from "@/app/admin/types";

export default function MessageListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<"week" | "month" | "year">("week");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getData");
      if (!response.ok) throw new Error("Erreur lors du chargement");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const response = await fetch(`/api/getData/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erreur lors de la suppression");
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  // Filter users by date range and search
  const filteredUsers = useMemo(() => {
    const days = dateFilter === "week" ? 7 : dateFilter === "month" ? 30 : 365;
    let result = filterByDateRange(users, days);

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchLower) ||
          user.lastName.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.phoneNumber.includes(search)
      );
    }

    return result;
  }, [users, dateFilter, search]);

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 animate-pulse p-4 rounded-lg bg-gray-50">
          <div className="h-10 w-10 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-3 bg-gray-200 rounded w-1/3" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="h-8 bg-gray-200 rounded w-8" />
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
        <EnvelopeOpenIcon className="w-10 h-10 text-blue-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">Aucun message trouvé</h3>
      <p className="text-gray-500 mt-1 max-w-sm">
        {search ? "Essayez de modifier votre recherche." : "Aucun message pour cette période."}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4 border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Tous les messages
              </CardTitle>
              <CardDescription className="text-gray-600">
                {filteredUsers.length} message{filteredUsers.length !== 1 ? "s" : ""} • 
                Gérez les demandes de contact
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative w-full sm:w-auto">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Rechercher par nom, email, téléphone..."
                  className="pl-9 w-full sm:w-72 bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2 whitespace-nowrap">
                <FileIcon className="h-4 w-4" />
                Exporter CSV
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs value={dateFilter} onValueChange={(v) => setDateFilter(v as typeof dateFilter)}>
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="week" className="data-[state=active]:bg-white">
                  Semaine
                </TabsTrigger>
                <TabsTrigger value="month" className="data-[state=active]:bg-white">
                  Mois
                </TabsTrigger>
                <TabsTrigger value="year" className="data-[state=active]:bg-white">
                  Année
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={dateFilter} className="mt-0">
              {loading ? (
                <LoadingSkeleton />
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-4">Erreur: {error}</p>
                  <Button onClick={fetchEmails}>Réessayer</Button>
                </div>
              ) : filteredUsers.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="rounded-xl border overflow-hidden shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="font-semibold">Client</TableHead>
                        <TableHead className="font-semibold">Téléphone</TableHead>
                        <TableHead className="hidden sm:table-cell font-semibold">Type</TableHead>
                        <TableHead className="hidden md:table-cell font-semibold">Date</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow
                          key={user._id}
                          className="hover:bg-blue-50/50 transition-all duration-200 group"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm shadow-md">
                                {getInitials(user.firstName, user.lastName)}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{user.phoneNumber}</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="secondary" className="font-normal bg-blue-50 text-blue-700 border-blue-200">
                              {user.userType}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-gray-500">
                            {formatDate(user.updatedAt || user.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link href={`/admin/message/${user._id}`}>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                                >
                                  <EnvelopeOpenIcon className="h-4 w-4 mr-1" />
                                  Voir
                                </Button>
                              </Link>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                    disabled={deletingId === user._id}
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Supprimer ce message ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Cette action est irréversible. Le message de {user.firstName} {user.lastName} sera définitivement supprimé.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(user._id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
