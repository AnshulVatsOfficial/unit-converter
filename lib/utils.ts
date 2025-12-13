import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prettyFromAndTo = (from: string, to: string) => {
  const prettyFrom = from.replace(/_/g, " ");
  const prettyTo = to.replace(/_/g, " ");
  return {
    prettyFrom,
    prettyTo,
    title: `${prettyFrom.charAt(0).toUpperCase()}${prettyFrom.substring(
      1
    )} to ${prettyTo.charAt(0).toUpperCase()}${prettyTo.substring(
      1
    )} converter — Unitlab`,
  };
};
