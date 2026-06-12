import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "urgent" | "soft" | "outline";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-calm-50 text-calm-700 border-calm-100",
  urgent: "bg-rose-50 text-rose-700 border-rose-100",
  soft: "bg-sand-50 text-amber-700 border-amber-100",
  outline: "bg-white/80 text-slate-700 border-line",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium leading-none shadow-[0_1px_0_rgba(255,255,255,0.7)_inset]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
