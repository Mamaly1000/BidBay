import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Item } from "@/db/schema";
import { BadgeDollarSign, Box, Gavel } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatToDollar(cents: number) {
  return `${Math.floor(cents / 100).toFixed(2)}`;
}

export function isBidOver(item: Item) {
  return item.endDate < new Date();
}
export const headertems = [
  {
    label: "all auctions",
    url: "/",
    Icon: Box,
  },
  {
    label: "create auction",
    url: "/items/create",
    Icon: Gavel,
  },
  {
    Icon: BadgeDollarSign,
    url: "/auctions",
    label: "my auctions",
  },
];
