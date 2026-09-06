import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-page px-[clamp(1.25rem,4vw,2.75rem)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  bordered = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-[clamp(4.5rem,9vw,8rem)] ${
        bordered ? "border-t border-line-1" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

/** Etiqueta em caixa alta com o ponto de status da marca. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-2.5 text-primary">
      <span
        aria-hidden
        className="inline-block size-1.5 shrink-0 rounded-full bg-primary animate-status"
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <header
      className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start"}`}
    >
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-h2 text-t1 text-balance max-w-[22ch]">{title}</h2>
      </Reveal>
      {lead ? (
        <Reveal delay={160}>
          <p className={`measure text-t3 ${centered ? "mx-auto" : ""}`}>
            {lead}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
