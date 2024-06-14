"use client";
import { Item } from "@/db/schema";
import { formatToDollar } from "@/lib/utils";
import { Hammer } from "lucide-react";
import React from "react";

const ItemTab = ({ item }: { item: Item }) => {
  const items = [
    {
      value: item.currentBid,
      label: "Current Bid",
      icon: Hammer,
    },
    {
      value: item.startingPrice,
      label: "Starting Price",
      icon: Hammer,
    },
    {
      value: item.bidInterval,
      label: "Bid Interval",
      icon: Hammer,
    },
  ];
  return (
    <div className="dark text-xl bg-gray-900 px-2 py-3 rounded-md flex items-center justify-center sm:divide-x-2 divide-y-2 sm:divide-y-0  divide-slate-600 flex-wrap">
      {items.map((item) => (
        <div
          key={item.label}
          className="text-sm flex items-center justify-between sm:justify-center gap-1 p-3 w-full sm:w-fit text-left"
        >
          {item.label}:
          <span className="font-bold text-green-500 ml-2 ">
            ${formatToDollar(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ItemTab;
