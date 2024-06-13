"use client";
import React from "react";
import { Button } from "./button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Message = ({
  image,
  message,
  action,
}: {
  image: string;
  message: string;
  action?: { label: string; path: string };
}) => {
  const router = useRouter();

  return (
    <section className="min-w-full flex flex-col items-center justify-center gap-5 py-10">
      <Image src={image} alt="pic" width={300} height={300} />
      <p className="text-lg capitalize text-orange-300 font-semibold w-fit max-w-[60%] mx-auto text-center ">
        {message}
      </p>
      {action && (
        <Button
          onClick={() => router.push(action.path)}
          className="capitalize"
          variant={"secondary"}
        >
          {action.label}
        </Button>
      )}
    </section>
  );
};

export default Message;
