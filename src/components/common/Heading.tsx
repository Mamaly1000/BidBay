"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface props {
  title?: string;
  subHeading?: string;
  action?: {
    label: string;
    onClick?: () => void;
    variant?:
      | "link"
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "primary"
      | null
      | undefined;
  };
  isLoading?: boolean;
  className?: string;
}
const Heading = ({
  isLoading,
  action,
  className,
  subHeading,
  title,
}: props) => {
  return (
    <section
      className={cn(
        "w-full flex flex-col items-start justify-start gap-2",
        className
      )}
    >
      <h1 className="text-2xl capitalize font-bold text-white w-full">
        {title}
      </h1>
      <p className="max-w-[60%] text-sm leading-normal text-orange-200 capitalize flex items-start justify-start gap-1 flex-row-reverse">
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {subHeading}
      </p>
      {action && (
        <Button
          disabled={isLoading}
          variant={action.variant}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </section>
  );
};

export default Heading;
