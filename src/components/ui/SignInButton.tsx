"use client";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "./button";
import CustomTooltip from "./CustomTooltip";
import { useState } from "react";

const SignInButton = () => {
  const [isLoading, setLoading] = useState(false);
  return (
    <>
      <CustomTooltip
        className=" hidden md:flex"
        align="center"
        side="bottom"
        content={"login with Google"}
        onClick={() => {
          setLoading(true);
        }}
      >
        <Button
          className="hidden md:flex items-center justify-center gap-2"
          variant={"primary"}
          type="submit"
        >
          login {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        </Button>
      </CustomTooltip>
      <CustomTooltip
        className="md:hidden"
        align="center"
        side="bottom"
        content={"login with Google"}
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
    </>
  );
};
export default SignInButton;
