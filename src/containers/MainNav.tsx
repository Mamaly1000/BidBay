"use client";
import { headertems } from "@/lib/utils";
import React from "react";
import AuthionAction from "./AuthionAction";

const MainNav = () => {
  return (
    <div className="flex items-center justify-start gap-1">
      {headertems.map((i) => (
        <AuthionAction key={i.url} Icon={i.Icon} label={i.label} url={i.url} />
      ))}
    </div>
  );
};

export default MainNav;
