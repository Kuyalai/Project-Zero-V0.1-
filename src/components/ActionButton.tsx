import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type LinkButtonProps = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type NativeButtonProps = CommonProps & {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-[linear-gradient(135deg,#239884_0%,#45b89f_48%,#87d9c8_100%)] text-white shadow-[0_12px_28px_rgba(35,152,132,0.22)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(35,152,132,0.26)] active:translate-y-0 active:scale-[0.98]",
  secondary:
    "border-calm-200 bg-[linear-gradient(135deg,#ffffff_0%,#f2fbf8_100%)] text-calm-700 shadow-[0_10px_24px_rgba(148,163,184,0.12)] hover:-translate-y-0.5 hover:border-calm-300 hover:bg-calm-50 active:translate-y-0 active:scale-[0.98]",
  ghost:
    "border-line bg-white/85 text-slate-700 shadow-[0_10px_24px_rgba(148,163,184,0.10)] hover:-translate-y-0.5 hover:border-calm-200 hover:bg-white active:translate-y-0 active:scale-[0.98]",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm sm:text-[0.95rem]",
};

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-full border font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calm-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

function Spark() {
  return <span className="h-2 w-2 rounded-full bg-current/80" />;
}

export function ActionLink({ href, children, className, variant = "primary", size = "md", target, rel }: LinkButtonProps) {
  return (
    <Link href={href} target={target} rel={rel} className={cn(baseClassName, sizeClasses[size], variantClasses[variant], className)}>
      <Spark />
      <span>{children}</span>
    </Link>
  );
}

export function ActionButton({ children, className, variant = "primary", size = "md", type = "button", disabled, onClick }: NativeButtonProps) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cn(baseClassName, sizeClasses[size], variantClasses[variant], disabled && "cursor-not-allowed opacity-60", className)}>
      <Spark />
      <span>{children}</span>
    </button>
  );
}
