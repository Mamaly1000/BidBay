"use client";
import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { env } from "@/env";
import { Button } from "./button";
import Image from "next/image";
const UploadWidget = ({
  image,
  onChange,
  disabled,
}: {
  image: string;
  onChange: (base: string) => void;
  disabled?: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <CldUploadWidget
      onError={(error) => {
        console.log(error);
      }}
      onSuccess={(res: any) => {
        onChange(res?.info?.secure_url!);
      }}
      onShowCompleted={(res) => {
        console.log(res);
      }}
      options={{
        maxFiles: 1,
        styles: {
          palette: {
            window: "#2A2F3C",
            windowBorder: "#90A0B3",
            tabIcon: "#F97316",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#F97316",
            action: "#F97316",
            inactiveTabIcon: "#757A80",
            error: "#F44235",
            inProgress: "#F97316",
            complete: "#20B832",
            sourceBg: "#020817",
          },
        },
      }}
      uploadPreset={env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
    >
      {({ open }) => {
        return !image ? (
          <Button
            disabled={disabled}
            variant={"secondary"}
            onClick={(e) => {
              e.preventDefault();
              !disabled && open!();
            }}
          >
            Upload an Image
          </Button>
        ) : (
          <div
            onClick={(e) => {
              e.preventDefault();
              !disabled && open!();
            }}
            className="w-full min-h-[300px] flex items-center justify-center relative aspect-video cursor-pointer hover:opacity-70
             transition-all border-[1px] rounded-lg drop-shadow-2xl overflow-hidden"
          >
            <Image
              src={image}
              alt="uploaded-image"
              fill
              className="object-contain"
            />
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadWidget;
