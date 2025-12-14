// Admin section shared TypeScript types

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  userType: "Agence" | "Société" | "Bureau d'étude" | "Étudiant";
  interest: string;
  companyName?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  occupation: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LayoutConfig {
  _id: string;
  videoUrl: string;
  downloadUrl: string;
  fichDesUrl: string;
}

export type MessageStatus = "pending" | "read" | "replied";

export interface DateFilterOption {
  value: "week" | "month" | "year" | "all";
  label: string;
  days: number;
}

export const DATE_FILTERS: DateFilterOption[] = [
  { value: "week", label: "Cette semaine", days: 7 },
  { value: "month", label: "Ce mois", days: 30 },
  { value: "year", label: "Cette année", days: 365 },
  { value: "all", label: "Tout", days: -1 },
];

// Helper function to filter by date range
export function filterByDateRange<T extends { createdAt: string }>(
  items: T[],
  days: number
): T[] {
  if (days === -1) return items;
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return items.filter((item) => new Date(item.createdAt) >= cutoffDate);
}

// Format date for display - handles both string and object { text, date } formats
export function formatDate(dateInput: string | { text?: string; date?: string } | undefined): string {
  if (!dateInput) return "—";
  
  // Handle object format { text, date } from MongoDB
  let dateString: string;
  if (typeof dateInput === "object") {
    dateString = dateInput.date || dateInput.text || "";
  } else {
    dateString = dateInput;
  }
  
  if (!dateString) return "—";
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";
  
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Get initials from name
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

// Safely extract text from fields that might be objects { text, date }
export function getText(value: string | { text?: string; date?: string } | undefined | null): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.text || value.date || "";
}
