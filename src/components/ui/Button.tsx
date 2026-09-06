import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[4px] font-extrabold uppercase tracking-[0.1em] " +
  "min-h-11 transition-[transform,background-color,border-color,color,box-shadow] duration-300 " +
  "[transition-timing-function:var(--ease-apple)] hover:-translate-y-px active:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[0.72rem]",
  lg: "px-8 py-4.5 text-[0.78rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "text-bone shadow-[0_1px_0_0_rgb(255_255_255/0.12)_inset,0_10px_30px_-12px_rgb(227_82_5/0.65)] " +
    "bg-[linear-gradient(90deg,#E35205,#7E2A00)] hover:bg-[linear-gradient(90deg,#FF6E26,#9C3400)]",
  outline:
    "border border-line-2 bg-fill-2 text-t1 hover:border-primary/60 hover:bg-primary/10 hover:text-bone",
  ghost: "text-t2 hover:text-bone hover:bg-fill-2",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentPropsWithoutRef<"a">;

/** CTA da marca. Sempre renderiza como link, porque toda acao aqui e navegacao. */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
