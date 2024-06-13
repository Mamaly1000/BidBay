"use client";
import { env } from "@/env";
import { KnockProvider } from "@knocklabs/react";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={userId || ""}
    >
      {children}
    </KnockProvider>
  );
};

export default NotificationProvider;
