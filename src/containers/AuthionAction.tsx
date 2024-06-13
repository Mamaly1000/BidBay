"use client";
import CustomTooltip from "@/components/ui/CustomTooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AuthionAction = ({
  url,
  Icon,
  label,
}: {
  Icon: LucideIcon;
  label: string;
  url: string;
}) => {
  const pathname = usePathname();
  const isActive = !!pathname?.endsWith(url);
  return (
    <Link
      href={url}
      className={cn(
        "flex items-center justify-center capitalize px-3 py-2 text-slate-400 hover:text-white transition-all",
        isActive && "text-orange-500"
      )}
    >
      <span className="hidden md:flex items-center justify-center gap-1">
        <Icon className="w-4 h-4" />
        {label}
      </span>
      <CustomTooltip
        className="md:hidden"
        align="center"
        content={label}
        side="bottom"
      >
        <Icon className="w-4 h-4 md:hidden" />
      </CustomTooltip>
    </Link>
  );
};

export default AuthionAction;
