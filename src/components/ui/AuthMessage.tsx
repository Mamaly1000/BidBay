"use client";
import Image from "next/image";
import React from "react";

import pic from "./../../../public/images/undraw_two_factor_authentication_namy.svg";
import { Button } from "./button";

const AuthMessage = ({
  message,
  action,
}: {
  message: string;
  action?: { label: string; onClick: () => void };
}) => {
  return (
    <section className="min-w-full flex flex-col items-center justify-center gap-5 py-10">
      <Image src={pic.src} alt="pic" width={300} height={300} />
      <p className="text-lg capitalize text-orange-300 font-semibold w-full text-center">
        {message}
      </p>
      {action && (
        <Button onClick={action.onClick} variant={"secondary"}>
          {action.label}
        </Button>
      )}
    </section>
  );
};

export default AuthMessage;
