import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  name: string;
  isSmallText?: boolean;
  buttonCOmponent?: React.JSX.Element;
};

function Header({ name, isSmallText = false, buttonCOmponent }: Props) {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={cn(
          isSmallText ? "text-lg" : "text-2xl",
          "font-semibold dark:text-white",
        )}
      >
        {name}
      </h1>
      {buttonCOmponent}
    </div>
  );
}

export default Header;
