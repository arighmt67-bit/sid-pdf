import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "xl";
}

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

export function Card({
  className,
  gradient = false,
  hover = true,
  padding = "md",
  children,
  ...props
}: CardProps) {
  const content = (
    <div
      className={cn(
        "bg-card border border-border shadow-md rounded-2xl",
        paddings[padding],
        hover && "transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5",
        gradient && "relative overflow-hidden",
        className
      )}
      {...props}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (gradient) {
    return (
      <div className={cn("rounded-2xl bg-gradient-to-br from-accent via-accent-secondary to-accent p-[2px]", hover && "transition-all duration-300 hover:shadow-accent-lg")}>
        <div className="h-full w-full rounded-[calc(1rem-2px)] bg-card">
          <div className={cn(paddings[padding], "relative", hover && "transition-all duration-300", className)}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return content;
}
