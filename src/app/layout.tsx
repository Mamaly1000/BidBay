import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "@knocklabs/react/dist/index.css";

import { cn } from "@/lib/utils";
import Header from "@/containers/Header";
import NotificationProvider from "@/providers/NotificationProvider";
import { SessionProvider } from "next-auth/react";
import SideBar from "@/containers/SideBar";

const roboto = Roboto({ subsets: ["latin"], preload: true, weight: "400" });

export const metadata: Metadata = {
  title: "Bid Bay",
  description: "Generated by Bid Bay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <NotificationProvider>
          <body
            className={cn(
              roboto.className,
              "min-h-screen bg-neutral-700 text-white antialiased"
            )}
          >
            <Header />
            <SideBar />
            <main className="w-full p-2 lg:p-5">{children}</main>
          </body>
        </NotificationProvider>
      </SessionProvider>
    </html>
  );
}
