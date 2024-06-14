"use client";
import CustomTooltip from "@/components/ui/CustomTooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({
  url,
  Icon,
  label,
  className,
}: {
  Icon: LucideIcon;
  label: string;
  url: string;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive = !!pathname?.endsWith(url);
  return (
    <Link
      href={url}
      className={cn(
        "flex items-center justify-center capitalize px-3 py-2 text-slate-400 hover:text-white transition-all",
        isActive && "text-orange-500",
        className
      )}
    >
      <span className=" flex items-center justify-center gap-3">
        <Icon className="w-5 h-5" />
        {label}
      </span>
    </Link>
  );
};

export default NavLink;
