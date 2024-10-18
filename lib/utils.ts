import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { camelize, getCurrentInstance, toHandlerKey } from "vue";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};
