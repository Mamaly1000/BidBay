import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Button } from "./button";

interface props {
  children?: ReactNode;
  content?: string;
  align?: "center" | "end" | "start" | undefined;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  className?: string;
}
const CustomTooltip = ({
  className,
  children,
  content,
  align,
  side,
}: props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={className} asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className="bg-neutral-800 border-orange-800"
          side={side}
          align={align}
        >
          <p className="text-orange-300 capitalize">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
