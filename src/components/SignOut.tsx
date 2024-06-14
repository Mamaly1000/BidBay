import React from "react";
import { signOut } from "@/auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import CustomTooltip from "./ui/CustomTooltip";
import { cn } from "@/lib/utils";

export function SignOut({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className={cn(className)}
    >
      <Button className="hidden md:flex" variant={"outline"} type="submit">
        SignOut
      </Button>
      <CustomTooltip
        className="md:hidden"
        align="center"
        side="bottom"
        content="SignOut"
      >
        <Button
          className="  md:hidden"
          variant={"outline"}
          size={"icon"}
          type="submit"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </CustomTooltip>
    </form>
  );
}

export default SignOut;
