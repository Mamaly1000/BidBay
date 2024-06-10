import React from "react";
import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import CustomTooltip from "./ui/CustomTooltip";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button className="hidden md:flex" variant={"primary"} type="submit">
        Signin with Google
      </Button>
      <CustomTooltip
        className="md:hidden"
        align="center"
        side="bottom"
        content="Signin with Google"
      >
        <Button
          className="md:hidden"
          variant={"primary"}
          size={"icon"}
          type="submit"
        >
          <LogIn className="w-4 h-4" />
        </Button>
      </CustomTooltip>
    </form>
  );
}

export default SignIn;
