"use client";
import { headertems } from "@/lib/utils";
import React from "react";
import NavLink from "./NavLink";

const MainNav = () => {
  return (
    <div className="hidden lg:flex items-center justify-start gap-1 ">
      {headertems.map((i) => (
        <NavLink key={i.url} Icon={i.Icon} label={i.label} url={i.url} />
      ))}
    </div>
  );
};

export default MainNav;
