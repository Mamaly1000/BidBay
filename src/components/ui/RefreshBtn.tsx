"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./button";
import { RefreshCcw } from "lucide-react";

const RefreshBtn = ({
  label,
  path,
  variant,
}: {
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
  label: string;
  path?: string;
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        if (path) {
          router.push(path);
        } else {
          router.refresh();
        }
      }}
      variant={variant}
    >
      <RefreshCcw className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
};

export default RefreshBtn;
