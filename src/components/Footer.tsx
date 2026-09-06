import Image from "next/image";
import { Container } from "./ui/Section";
import { defaultWhatsappMessage, site, whatsappLink } from "@/lib/site";

const sections = [
  {
    title: "O site",
    links: [
      { href: "#o-buraco", label: "O buraco invisível" },
      { href: "#a-conta", label: "A conta da sua agenda" },
      { href: "#a-terceira-opcao", label: "A terceira opção" },
      { href: "#a-escada", label: "Os três degraus" },
      { href: "#como-comeca", label: "Como começa" },
      { href: "#duvidas", label: "Dúvidas" },
    ],
  },
  {
    title: "O que fazemos",
    links: [
      { href: "#a-escada", label: "Google Meu Negócio gerido" },
      { href: "#a-escada", label: "Rotina de confirmação" },
      { href: "#a-escada", label: "WhatsApp organizado" },
      { href: "#a-escada", label: "Conteúdo e carrosséis" },
      { href: "#a-escada", label: "Site e página de campanha" },
      { href: "#a-escada", label: "Relatório mensal de gestão" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line-1 bg-fill-1">
      <Container>
        <div className="grid gap-12 py-[clamp(3rem,6vw,4.5rem)] md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="flex flex-col items-start gap-5">
            <Image
              src="/brand/n-logo-horizontal-white.png"
              alt="Nexistown"
              width={1768}
              height={464}
              className="h-7 w-auto"
            />
            <p className="max-w-[28ch] text-[0.86rem] leading-relaxed text-t3">
              Presença digital para clínicas e negócios de agenda em {site.city}
              , {site.state}. Sua agenda para de furar. Seu Google para de te
              esconder.
            </p>
            <p className="text-[0.75rem] leading-relaxed text-t5">
              {site.region}.
            </p>
          </div>

          {sections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <p className="eyebrow text-t4">{section.title}</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.84rem] text-t3 transition-colors duration-150 hover:text-bone"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="eyebrow text-t4">Falar com a gente</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              <li>
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.84rem] text-t3 transition-colors duration-150 hover:text-bone"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[0.84rem] text-t3 transition-colors duration-150 hover:text-bone"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <p className="mt-6 text-[0.75rem] leading-relaxed text-t5">
              Diagnóstico gratuito, 15 minutos, sem compromisso.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line-1 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-t5">
            © {new Date().getFullYear()} {site.name}. {site.domain}
          </p>
          <p className="max-w-[52ch] text-[0.72rem] leading-relaxed text-t5">
            Os valores desta página são estimativas montadas com médias do setor
            e servem para dimensionar potencial, não como promessa de resultado.
          </p>
        </div>
      </Container>
    </footer>
  );
}
