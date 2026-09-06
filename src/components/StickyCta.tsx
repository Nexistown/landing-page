"use client";

import { useEffect, useState } from "react";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";

/**
 * Barra fixa de CTA no mobile. Aparece depois que o hero sai da tela e some
 * quando o bloco de diagnostico entra, para nao competir com ele.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById("diagnostico");

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const nearEnd = target
        ? target.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      setShow(pastHero && !nearEnd);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-2 bg-ink/95 p-3 backdrop-blur-xl transition-transform duration-300 [transition-timing-function:var(--ease-apple)] sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a
        href={whatsappLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? undefined : -1}
        className="flex min-h-12 items-center justify-center rounded-[4px] bg-[linear-gradient(90deg,#E35205,#7E2A00)] px-6 text-[0.74rem] font-extrabold uppercase tracking-[0.1em] text-bone"
      >
        Quero meu diagnóstico gratuito
      </a>
    </div>
  );
}
