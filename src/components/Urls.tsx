"use client";
import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  UpdateIcon,
  Link2Icon,
  DownloadIcon,
  FileTextIcon,
  UploadIcon,
  TrashIcon,
  FileIcon,
} from "@radix-ui/react-icons";

interface FileUploadState {
  isUploading: boolean;
  progress: number;
  fileName: string | null;
}

export default function Urls() {
  const [formData, setFormData] = useState({
    videoUrl: "",
    downloadUrl: "",
    fichDesUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // File upload states
  const [downloadFile, setDownloadFile] = useState<FileUploadState>({
    isUploading: false,
    progress: 0,
    fileName: null,
  });
  const [fichDesFile, setFichDesFile] = useState<FileUploadState>({
    isUploading: false,
    progress: 0,
    fileName: null,
  });

  const downloadInputRef = useRef<HTMLInputElement>(null);
  const fichDesInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/layout");
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        if (data && data[0]) {
          setFormData({
            videoUrl: data[0].videoUrl || "",
            downloadUrl: data[0].downloadUrl || "",
            fichDesUrl: data[0].fichDesUrl || "",
          });
          // Extract filenames from URLs
          if (data[0].downloadUrl) {
            const downloadName = extractFileName(data[0].downloadUrl);
            setDownloadFile((prev) => ({ ...prev, fileName: downloadName }));
          }
          if (data[0].fichDesUrl) {
            const fichDesName = extractFileName(data[0].fichDesUrl);
            setFichDesFile((prev) => ({ ...prev, fileName: fichDesName }));
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const extractFileName = (url: string): string => {
    try {
      const parts = url.split("/");
      const fileName = parts[parts.length - 1];
      // Remove timestamp prefix if present
      const cleanName = fileName.replace(/^\d+-[a-z0-9]+-/, "");
      return decodeURIComponent(cleanName);
    } catch {
      return "Fichier téléchargé";
    }
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      videoUrl: e.target.value,
    }));
    setSuccess(false);
  };

  const uploadFile = async (
    file: File,
    folder: string,
    setUploadState: React.Dispatch<React.SetStateAction<FileUploadState>>,
    fieldName: "downloadUrl" | "fichDesUrl"
  ) => {
    try {
      setUploadState({ isUploading: true, progress: 0, fileName: null });
      setError(null);

      // Create form data for direct upload
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);
      formDataToSend.append("folder", folder);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadState((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 200);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Erreur lors du téléchargement");
      }

      setUploadState({
        isUploading: false,
        progress: 100,
        fileName: file.name,
      });

      // Update form data with the new URL
      setFormData((prev) => ({
        ...prev,
        [fieldName]: result.publicUrl,
      }));

      setSuccess(false);
    } catch (err) {
      setUploadState({ isUploading: false, progress: 0, fileName: null });
      setError(err instanceof Error ? err.message : "Erreur lors du téléchargement");
    }
  };

  const handleDownloadFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file, "downloads", setDownloadFile, "downloadUrl");
    }
  };

  const handleFichDesFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file, "fiches", setFichDesFile, "fichDesUrl");
    }
  };

  const clearFile = (
    fieldName: "downloadUrl" | "fichDesUrl",
    setUploadState: React.Dispatch<React.SetStateAction<FileUploadState>>,
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
    setUploadState({ isUploading: false, progress: 0, fileName: null });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setSuccess(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch("/api/layout", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur lors de la sauvegarde");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-10 bg-gray-100 rounded-lg" />
        </div>
      ))}
      <div className="h-10 bg-gray-200 rounded-lg w-32 mt-6" />
    </div>
  );

  const FileUploadBox = ({
    label,
    icon: Icon,
    inputRef,
    uploadState,
    currentUrl,
    onFileChange,
    onClear,
    accept,
  }: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    inputRef: React.RefObject<HTMLInputElement | null>;
    uploadState: FileUploadState;
    currentUrl: string;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    accept?: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-gray-700 font-medium flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400" />
        {label}
      </Label>
      <div className="relative">
        <input
          type="file"
          ref={inputRef}
          onChange={onFileChange}
          accept={accept}
          className="hidden"
        />

        {uploadState.isUploading ? (
          // Uploading state
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center gap-3">
              <UpdateIcon className="h-5 w-5 text-blue-500 animate-spin" />
              <div className="flex-1">
                <p className="text-sm text-blue-700">Téléchargement en cours...</p>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadState.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : currentUrl ? (
          // File uploaded state
          <div className="border border-green-200 rounded-lg p-4 bg-green-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <FileIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">
                  {uploadState.fileName || "Fichier téléchargé"}
                </p>
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-600 hover:underline truncate block max-w-[300px]"
                >
                  Voir le fichier
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <UploadIcon className="h-4 w-4 mr-1" />
                Remplacer
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClear}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          // Empty state - drop zone
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
          >
            <UploadIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Cliquez pour télécharger un fichier
            </p>
            <p className="text-xs text-gray-400 mt-1">
              ou glissez-déposez ici
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
            <Link2Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Configuration des URLs et Fichiers
            </CardTitle>
            <p className="text-sm text-gray-500">
              Gérez les liens et téléchargements du site
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-6">
            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                <CheckIcon className="h-4 w-4" />
                Configuration sauvegardée avec succès !
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* YouTube URL - Keep as URL input */}
            <div className="space-y-2">
              <Label
                htmlFor="videoUrl"
                className="text-gray-700 font-medium flex items-center gap-2"
              >
                <Link2Icon className="h-4 w-4 text-gray-400" />
                URL de la vidéo YouTube
              </Label>
              <Input
                type="url"
                id="videoUrl"
                name="videoUrl"
                placeholder="https://youtube.com/..."
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                value={formData.videoUrl}
                onChange={handleVideoUrlChange}
              />
            </div>

            {/* Download File - Upload to R2 */}
            <FileUploadBox
              label="Fichier à télécharger (RPA Plugin, etc.)"
              icon={DownloadIcon}
              inputRef={downloadInputRef}
              uploadState={downloadFile}
              currentUrl={formData.downloadUrl}
              onFileChange={handleDownloadFileChange}
              onClear={() => clearFile("downloadUrl", setDownloadFile, downloadInputRef)}
              accept=".zip,.rar,.exe,.msi,.pdf,.doc,.docx"
            />

            {/* Fiche Descriptive - Upload to R2 */}
            <FileUploadBox
              label="Fiche descriptive (PDF)"
              icon={FileTextIcon}
              inputRef={fichDesInputRef}
              uploadState={fichDesFile}
              currentUrl={formData.fichDesUrl}
              onFileChange={handleFichDesFileChange}
              onClear={() => clearFile("fichDesUrl", setFichDesFile, fichDesInputRef)}
              accept=".pdf"
            />

            <div className="pt-4">
              <Button
                onClick={handleSave}
                disabled={saving || downloadFile.isUploading || fichDesFile.isUploading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                {saving ? (
                  <>
                    <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
