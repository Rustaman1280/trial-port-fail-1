import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: Array<string | false | null | undefined | Record<string, boolean>>) =>
  twMerge(clsx(inputs));

export const formatDate = (date: string | Date, locale = "en-US") => {
  const value = typeof date === "string" ? new Date(date) : date;
  return value.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const chunk = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
