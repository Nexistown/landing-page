import { ArcGauge } from "./ui/ArcGauge";
import { Button } from "./ui/Button";
import { Container, Eyebrow } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";

const marketNumbers = [
  { label: "Agenda potencial no mês", value: "R$ 50.000" },
  { label: "O que a falta leva", value: "R$ 15.000", highlight: true },
  { label: "Ferramentas que ninguém abre", value: "R$ 800" },
];

export function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden pt-[9.5rem] pb-[clamp(4rem,8vw,7rem)]"
    >
      {/* Brilho de marca no fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-[28rem] left-1/2 size-[62rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,82,5,0.16),transparent_62%)] animate-drift" />
        <div className="absolute -right-40 top-40 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(126,42,0,0.24),transparent_66%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px gradient-rule opacity-40" />
      </div>

      <Container>
        <div className="grid items-center gap-[clamp(2.75rem,5vw,4rem)] lg:grid-cols-[1.22fr_1fr]">
          {/* Coluna de texto */}
          <div className="flex flex-col items-start gap-7">
            <Reveal>
              <Eyebrow>Parnaíba, Piauí . Negócios de agenda</Eyebrow>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="text-h1 text-t1 text-pretty">
                Sua clínica não perde paciente por falta de gente. Perde por{" "}
                <span className="gradient-text">
                  gente que chegou e escapou.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="measure text-[1.02rem] text-t3">
                A Nexistown cuida da presença digital de clínicas e negócios de
                agenda em Parnaíba. A gente corrige o que espanta paciente no
                Google, faz a agenda parar de furar e chama de volta quem sumiu.
                Sem promessa de alcance, com relatório de número.
              </p>
            </Reveal>

            <Reveal delay={260} className="w-full">
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Button
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Diagnóstico gratuito
                </Button>
                <Button href="#a-conta" variant="outline" size="lg">
                  Ver a conta antes
                </Button>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <p className="text-[0.82rem] text-t4">
                15 minutos, por telefone. Cinco perguntas e um raio-x da
                clínica. Não é venda, é diagnóstico.
              </p>
            </Reveal>
          </div>

          {/* Cartao de raio-x */}
          <Reveal delay={220} className="w-full">
            <figure className="gradient-border rounded-[4px] bg-fill-2 p-[clamp(1.5rem,3vw,2.25rem)] backdrop-blur-sm">
              <figcaption className="eyebrow text-t4">
                A média do consultório brasileiro
              </figcaption>

              <div className="mt-7 flex items-center gap-[clamp(1.25rem,3vw,2rem)]">
                <ArcGauge
                  value={0.3}
                  label="30%"
                  caption="Faltam"
                  className="size-[clamp(7.5rem,18vw,9.5rem)] shrink-0"
                />
                <p className="text-[0.92rem] leading-relaxed text-t3">
                  De cada dez pacientes que marcam, três não aparecem. A cadeira
                  fica vazia numa terça de manhã e ninguém lança isso em lugar
                  nenhum.
                </p>
              </div>

              <dl className="mt-8 flex flex-col gap-px overflow-hidden rounded-[4px] bg-line-1">
                {marketNumbers.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 bg-ink px-4 py-3.5"
                  >
                    <dt className="text-[0.82rem] text-t3">{row.label}</dt>
                    <dd
                      className={`shrink-0 text-[0.98rem] font-extrabold tabular-nums ${
                        row.highlight ? "text-primary" : "text-t1"
                      }`}
                    >
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 text-[0.72rem] leading-relaxed text-t5">
                Estimativa com a média de mercado. Na consultoria a conta é
                refeita com o número da sua clínica.
              </p>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
