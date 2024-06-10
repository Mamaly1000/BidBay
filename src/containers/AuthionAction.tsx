"use client";

import CustomTooltip from "@/components/ui/CustomTooltip";
import { cn } from "@/lib/utils";
import { Gavel } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AuthionAction = () => {
  const pathname = usePathname();
  const isActive = !!pathname?.endsWith("/items/create");
  return (
    <Link
      href={"/items/create"}
      className={cn(
        "flex items-center justify-center capitalize px-3 py-2 text-slate-400 hover:text-white transition-all",
        isActive && "text-orange-500"
      )}
    >
      <span className="hidden md:flex items-center justify-center gap-1">
        <Gavel className="w-4 h-4" />
        auction item
      </span>
      <CustomTooltip
        className="md:hidden"
        align="center"
        content="auction item"
        side="bottom"
      >
        <Gavel className="w-4 h-4 md:hidden" />
      </CustomTooltip>
    </Link>
  );
};

export default AuthionAction;
