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
    label: "Create item",
    url: "/items/create",
    Icon: Box,
  },
  {
    label: "my Auctions",
    url: "/auctions",
    Icon: BadgeDollarSign,
  },
  {
    label: "Create auction",
    url: "/auctions/create",
    Icon: Gavel,
  },
];
import { Item } from "@/db/schema";
