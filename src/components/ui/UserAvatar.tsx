"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const UserAvatar = ({
  fallback,
  src,
  alt,
}: {
  src?: string | null;
  alt?: string | null;
  fallback?: string | null;
}) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
