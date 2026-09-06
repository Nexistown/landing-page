"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Container } from "./ui/Section";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";

const nav = [
  { href: "#o-buraco", label: "O buraco" },
  { href: "#a-conta", label: "A conta" },
  { href: "#a-escada", label: "Os planos" },
  { href: "#como-comeca", label: "Como começa" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o corpo enquanto o menu do mobile estiver aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line-1 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-[4.75rem] items-center justify-between gap-6">
          <a
            href="#topo"
            className="shrink-0"
            aria-label="Nexistown, ir para o topo"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/brand/n-logo-horizontal-white.png"
              alt="Nexistown"
              width={1768}
              height={464}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </a>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Seções do site"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.82rem] font-medium text-t3 transition-colors duration-150 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* O wrapper controla a visibilidade: o proprio Button ja define
                display, e as duas classes brigariam na mesma camada. */}
            <div className="hidden sm:block">
              <Button
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Diagnóstico gratuito
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-11 place-items-center rounded-[4px] border border-line-2 text-t2 transition-colors hover:text-bone lg:hidden"
            >
              <span className="relative block h-2.5 w-4.5">
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-current transition-transform duration-300 ${
                    open ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-current transition-transform duration-300 ${
                    open ? "top-1 -rotate-45" : "top-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Menu do mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-line-1 bg-ink/95 backdrop-blur-xl lg:hidden"
      >
        <Container>
          <nav className="flex flex-col py-4" aria-label="Seções do site">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-1 py-4 text-h4 text-t2 transition-colors hover:text-bone"
              >
                {item.label}
              </a>
            ))}
            <Button
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="mt-6 mb-2"
              onClick={() => setOpen(false)}
            >
              Diagnóstico gratuito
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
}
