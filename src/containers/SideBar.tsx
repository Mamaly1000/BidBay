"use client";
import React from "react";
import { useSidebar } from "@/hooks/use-sidebar-store";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import UserAvatar from "@/components/ui/UserAvatar";
import { headertems } from "@/lib/utils";
import NavLink from "./NavLink";
import { LogOut } from "lucide-react";

const SideBar = () => {
  const { isOpen, onChange } = useSidebar();
  const session = useSession();
  return (
    <Sheet open={isOpen} onOpenChange={onChange}>
      <SheetContent className="bg-neutral-800 text-white dark" side={"left"}>
        <SheetHeader className="max-w-full line-clamp-1">
          <SheetTitle className="w-full flex items-center justify-start gap-2">
            <UserAvatar src={session.data?.user.image} />
            <span className="font-bold flex flex-col items-start justify-start">
              {session.data?.user.name}
              <SheetDescription>{session.data?.user.email}</SheetDescription>
            </span>
          </SheetTitle>
        </SheetHeader>
        <section className="flex items-start py-5 justify-start gap-2 w-full max-w-full flex-col">
          <div className="flex items-start justify-start flex-col gap-4">
            <h2 className="w-full text-left capitalize font-semibold text-lg mb-1">
              wellcome to{" "}
              <span className="text-orange-500 font-extrabold text-2xl">
                BidBay
              </span>
            </h2>
            {headertems.map((item) => (
              <NavLink
                className="px-0 py-0"
                Icon={item.Icon}
                label={item.label}
                url={item.url}
                key={item.url}
              />
            ))}
          </div>
        </section>
        <SheetFooter className="flex-col p-0 sm:flex-row sm:justify-start sm:space-x-0 w-full flex items-center justify-start gap-1 md:hidden">
          <Button
            className="float-left capitalize flex items-center gap-2"
            variant={"destructive"}
            onClick={() => {
              signOut({
                redirect: true,
                callbackUrl: "/",
              });
            }}
          >
            sign out <LogOut className="w-5 h-5" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
