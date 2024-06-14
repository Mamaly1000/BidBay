import React from "react";
import { signIn } from "@/auth";
import SignInButton from "./ui/SignInButton";
import { cn } from "@/lib/utils";

export function SignIn({ className }: { className?: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
      className={cn(className)}
    >
      <SignInButton />
    </form>
  );
}

export default SignIn;
