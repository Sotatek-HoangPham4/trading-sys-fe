import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function Input({ startIcon, endIcon, className, type, ...props }: InputProps) {
  return (
    <div className="relative flex items-center">
      {startIcon && (
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 cursor-pointer">
          {startIcon}
        </div>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground h-9 rounded-md placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 border bg-transparent pl-9 pr-8 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
          startIcon ? "pl-9" : "pl-3",
          endIcon ? "pr-9" : "pr-3"
        )}
        {...props}
      />

      {endIcon && (
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer">
          {endIcon}
        </div>
      )}
    </div>
  );
}

export { Input };
