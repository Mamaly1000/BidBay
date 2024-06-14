"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import CustomTooltip from "./CustomTooltip";
import { cn } from "@/lib/utils";

const UserAvatar = ({
  fallback,
  src,
  alt,
  onClick,
  className,
}: {
  onClick?: () => void;
  tooltip?: boolean;
  src?: string | null;
  alt?: string | null;
  fallback?: string | null;
  className?: string;
}) => {
  return (
    <CustomTooltip
      onClick={onClick}
      className={cn(
        !!onClick && "cursor-pointer hover:opacity-70 transition-all"
      )}
      align="center"
      content={fallback}
      side="bottom"
    >
      <Avatar className={cn(className)}>
        <AvatarImage src={src!} alt={alt!} />
        {!!fallback && <AvatarFallback>{fallback?.slice(0, 2)}</AvatarFallback>}
      </Avatar>
    </CustomTooltip>
  );
};

export default UserAvatar;
