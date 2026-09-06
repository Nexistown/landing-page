import { Button } from "./ui/Button";
import { Container, Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { whatsappLink } from "@/lib/site";

type Pillar = { name: string; kind: "P" | "E" };

type Tier = {
  step: string;
  name: string;
  price: string;
  kicker: string;
  inherits?: string;
  pillars: Pillar[];
  term: string;
  who: string;
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    step: "Degrau 01",
    name: "Agenda Cheia",
    price: "1.800",
    kicker: "Organiza quem já chega, e faz a agenda parar de furar.",
    pillars: [
      {
        name: "Google Meu Negócio gerido, com foto nova e resposta a toda avaliação",
        kind: "P",
      },
      {
        name: "Rotina de confirmação de consulta em D-2 e D-1, com a recepção treinada",
        kind: "E",
      },
      {
        name: "WhatsApp Business organizado, com etiqueta, catálogo e meta de resposta",
        kind: "E",
      },
      {
        name: "Oito carrosséis por mês, dentro da norma do conselho",
        kind: "P",
      },
      {
        name: "Relatório mensal de gestão, com a taxa de falta antes e depois",
        kind: "E",
      },
    ],
    term: "6 meses",
    who: "O consultório que já atende bem e tem nota alta, mas está invisível no Google e perde horário toda semana.",
    featured: true,
  },
  {
    step: "Degrau 02",
    name: "Paciente que Volta",
    price: "2.700",
    kicker: "Vai buscar a receita que já foi sua e ficou parada no passado.",
    inherits: "Agenda Cheia",
    pillars: [
      {
        name: "Régua de reativação da base inativa, em três toques",
        kind: "E",
      },
      {
        name: "Higienização da base, do caderno e da ficha para lista organizada",
        kind: "E",
      },
      {
        name: "Site institucional com página de campanha, no seu domínio",
        kind: "P",
      },
    ],
    term: "8 meses",
    who: "O consultório que já organizou o presente e tem ativo parado no passado.",
  },
  {
    step: "Degrau 03",
    name: "Clínica no Comando",
    price: "3.500",
    kicker:
      "Você passa a enxergar o próprio negócio em dois minutos de relatório.",
    inherits: "Paciente que Volta",
    pillars: [
      {
        name: "Recall preventivo programado, chamando a manutenção no mês certo",
        kind: "E",
      },
      {
        name: "Recuperação de orçamento apresentado e nunca respondido",
        kind: "E",
      },
      { name: "Painel de indicadores revisado com você todo mês", kind: "E" },
    ],
    term: "12 meses",
    who: "O dono que quer entender o próprio negócio, faturando de R$ 50.000 a R$ 60.000 por mês.",
  },
];

const outOfLadder = [
  "Gestão de tráfego pago",
  "Identidade visual e rebrand",
  "Produção fotográfica presencial",
  "Campanha de inauguração ou evento",
];

const neverBundled = [
  "Verba de mídia",
  "Domínio e hospedagem",
  "Ferramentas de terceiros no seu CNPJ",
];

function PillarKind({ kind }: { kind: Pillar["kind"] }) {
  const isEfficiency = kind === "E";
  return (
    <span
      title={
        isEfficiency ? "Eficiência, corta custo" : "Performance, gera venda"
      }
      className={`mt-[0.3rem] grid size-[1.15rem] shrink-0 place-items-center rounded-[3px] text-[0.58rem] font-black ${
        isEfficiency ? "bg-primary/15 text-primary" : "bg-fill-3 text-t3"
      }`}
    >
      {kind}
    </span>
  );
}

export function Ladder() {
  return (
    <Section id="a-escada" className="bg-fill-1">
      <Container>
        <SectionHeading
          eyebrow="A escada de três degraus"
          title={
            <>
              Um degrau por vez.{" "}
              <span className="gradient-text">Começando pelo mais barato.</span>
            </>
          }
          lead="Onze pilares no total, e sete deles cortam custo em vez de gerar venda nova. Cada degrau herda tudo do anterior. A recomendação da casa é começar no primeiro, mesmo para quem já caberia no segundo."
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 100}
              className={`relative flex h-full flex-col rounded-[4px] p-[clamp(1.5rem,2.6vw,2rem)] ${
                tier.featured
                  ? "gradient-border bg-fill-3"
                  : "border border-line-1 bg-fill-1"
              }`}
            >
              {tier.featured ? (
                <span className="eyebrow absolute -top-2.5 left-6 rounded-full bg-[linear-gradient(90deg,#E35205,#7E2A00)] px-3 py-1 text-bone">
                  Comece aqui
                </span>
              ) : null}

              <p className="eyebrow text-t4">{tier.step}</p>
              <h3 className="mt-3 text-h3 text-t1">{tier.name}</h3>
              <p className="mt-2.5 text-[0.86rem] leading-relaxed text-t3">
                {tier.kicker}
              </p>

              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-[0.9rem] font-bold text-t4">R$</span>
                <span className="text-[clamp(2rem,4vw,2.5rem)] font-black leading-none tracking-[-0.03em] text-t1 tabular-nums">
                  {tier.price}
                </span>
                <span className="text-[0.86rem] font-medium text-t4">/mês</span>
              </p>

              <div className="mt-7 border-t border-line-1 pt-6">
                {tier.inherits ? (
                  <p className="mb-4 text-[0.8rem] font-semibold text-primary">
                    Tudo do {tier.inherits}, mais:
                  </p>
                ) : null}

                <ul className="flex flex-col gap-3.5">
                  {tier.pillars.map((pillar) => (
                    <li key={pillar.name} className="flex gap-3">
                      <PillarKind kind={pillar.kind} />
                      <span className="text-[0.86rem] leading-relaxed text-t2">
                        {pillar.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="mt-auto flex flex-col gap-3 border-t border-line-1 pt-6 text-[0.8rem] leading-relaxed">
                <div className="flex gap-2">
                  <dt className="shrink-0 font-bold text-t4">Prazo mínimo:</dt>
                  <dd className="text-t2">{tier.term}</dd>
                </div>
                <div>
                  <dt className="font-bold text-t4">Para quem:</dt>
                  <dd className="mt-0.5 text-t3">{tier.who}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] text-t4">
            <span className="flex items-center gap-2">
              <span className="grid size-[1.15rem] place-items-center rounded-[3px] bg-primary/15 text-[0.58rem] font-black text-primary">
                E
              </span>
              Eficiência, corta custo que já sai do caixa
            </span>
            <span className="flex items-center gap-2">
              <span className="grid size-[1.15rem] place-items-center rounded-[3px] bg-fill-3 text-[0.58rem] font-black text-t3">
                P
              </span>
              Performance, traz paciente novo
            </span>
          </p>
        </Reveal>

        {/* Transparencia de escopo */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-[4px] bg-line-1 sm:grid-cols-2">
          <Reveal className="bg-ink p-7">
            <p className="eyebrow text-t4">Fora da escada, cobrado à parte</p>
            <ul className="mt-4 flex flex-col gap-2">
              {outOfLadder.map((item) => (
                <li key={item} className="text-[0.86rem] text-t2">
                  - {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="bg-ink p-7">
            <p className="eyebrow text-t4">Nunca embutido no plano</p>
            <ul className="mt-4 flex flex-col gap-2">
              {neverBundled.map((item) => (
                <li key={item} className="text-[0.86rem] text-t2">
                  - {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.75rem] leading-relaxed text-t5">
              Fica tudo no seu CNPJ e no seu nome. Se um dia a gente se separar,
              você leva as contas com você.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="measure text-[0.92rem] text-t3">
              Não dá para saber qual degrau é o seu sem ver o seu número. É
              exatamente isso que o diagnóstico resolve, e ele é gratuito.
            </p>
            <Button
              href={whatsappLink(
                "Olá, vi os planos no site da Nexistown e quero entender qual degrau faz sentido para a minha clínica.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="shrink-0"
            >
              Descobrir meu degrau
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
