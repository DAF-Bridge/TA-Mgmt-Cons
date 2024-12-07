import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatInternalUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  // Ensure we have a properly formatted URL
  const apiUrl = new URL(url, baseUrl).toString();
  return apiUrl;
}

export function formatExternalUrl(url: string) {
  const baseUrl = process.env.GO_API_URL;

  // Ensure we have a properly formatted URL
  const apiUrl = new URL(url, baseUrl).toString();
  return apiUrl;
}