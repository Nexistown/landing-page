"use client";

import { useId, useMemo, useState } from "react";
import { ArcGauge } from "./ui/ArcGauge";
import { Button } from "./ui/Button";
import { Container, Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { money, number, roundToHundred } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

/* ------------------------------------------------------------------
   Premissas da conta. Sao as mesmas do metodo da casa, cenario
   CONSERVADOR. Nada aqui usa o cenario realista, de proposito: o
   numero que aparece na tela precisa ser o piso, nunca o teto.
   ------------------------------------------------------------------ */

/** Margem de contribuicao estimada do nicho. Receita nova entra pela margem. */
const MARGIN = 0.55;
/** Meta conservadora de falta. A media de mercado parte de 30%. */
const NO_SHOW_TARGET = 0.22;
/** Fatia da base inativa que volta a marcar por mes, no piso. */
const REACTIVATION_RATE = 0.03;
/** Pacientes novos por mes vindos de um perfil do Google corrigido. */
const NEW_FROM_GOOGLE = 3;
/** Pacientes por mes que hoje se perdem por demora na resposta. */
const RECOVERED_FROM_REPLY = 2;
/** A primeira consulta custa menos que o ticket de retorno. */
const ENTRY_TICKET_RATIO = 0.78;
/** Fatia da conta de ferramentas que costuma ser duplicada ou sem controle. */
const TOOL_CUT_RATE = 0.5;
/** Precos dos dois primeiros degraus da escada. */
const PRICE_N1 = 1800;
const PRICE_N2 = 2700;

type Inputs = {
  agenda: number;
  missPerTen: number;
  inactive: number;
  ticket: number;
  tools: number;
};

const initial: Inputs = {
  agenda: 50000,
  missPerTen: 3,
  inactive: 320,
  ticket: 450,
  tools: 800,
};

function useEstimate(input: Inputs) {
  return useMemo(() => {
    const missRate = input.missPerTen / 10;

    // O que a agenda deixa na mesa hoje, em faturamento cheio.
    const leftOnTable = input.agenda * missRate;

    // Cada linha entra pela margem, nunca pelo faturamento inteiro.
    const noShow =
      input.agenda * Math.max(0, missRate - NO_SHOW_TARGET) * MARGIN;
    const reactivation =
      input.inactive * REACTIVATION_RATE * input.ticket * MARGIN;
    const google = NEW_FROM_GOOGLE * input.ticket * ENTRY_TICKET_RATIO * MARGIN;
    const fastReply = RECOVERED_FROM_REPLY * input.ticket * MARGIN;
    // Economia entra cheia, porque e dinheiro que para de sair do caixa.
    const toolCut = input.tools * TOOL_CUT_RATE;

    // Cada linha e entregue por um degrau especifico da escada. Misturar os
    // degraus na mesma conta seria vender o que o plano de entrada nao faz.
    const linesN1 = [
      {
        id: "noShow",
        label: "Queda da falta",
        detail: `De ${input.missPerTen} em 10 para pouco mais de 2 em 10`,
        value: roundToHundred(noShow),
        kind: "margem recuperada" as const,
      },
      {
        id: "fastReply",
        label: "Paciente que não se perde mais na demora",
        detail: `${RECOVERED_FROM_REPLY} por mês, com o WhatsApp organizado`,
        value: roundToHundred(fastReply),
        kind: "margem recuperada" as const,
      },
      {
        id: "google",
        label: "Paciente novo vindo do Google",
        detail: `${NEW_FROM_GOOGLE} por mês, com o perfil corrigido`,
        value: roundToHundred(google),
        kind: "venda nova" as const,
      },
      {
        id: "toolCut",
        label: "Ferramenta e impulsionamento cortados",
        detail: "Metade do que sai hoje sem ninguém conferir",
        value: roundToHundred(toolCut),
        kind: "economia" as const,
      },
    ];

    const linesN2 = [
      {
        id: "reactivation",
        label: "Base inativa que volta a marcar",
        detail: `${number(input.inactive * REACTIVATION_RATE)} pacientes por mês, dos ${number(input.inactive)} parados`,
        value: roundToHundred(reactivation),
        kind: "margem recuperada" as const,
      },
    ];

    const totalN1 = linesN1.reduce((sum, line) => sum + line.value, 0);
    const totalN2 =
      totalN1 + linesN2.reduce((sum, line) => sum + line.value, 0);

    return {
      missRate,
      leftOnTable,
      // Linha zerada nao entra na tela: nao ha o que recuperar ali.
      linesN1: linesN1.filter((line) => line.value > 0),
      linesN2: linesN2.filter((line) => line.value > 0),
      totalN1,
      totalN2,
      profitN1: totalN1 - PRICE_N1,
      multipleN1: totalN1 / PRICE_N1,
      multipleN2: totalN2 / PRICE_N2,
      noShowAlreadyGood: noShow <= 0,
      paysOff: totalN1 >= PRICE_N1,
    };
  }, [input]);
}

/* ------------------------------------------------------------------ */

type FieldProps = {
  label: string;
  hint?: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

function Field({
  label,
  hint,
  display,
  min,
  max,
  step,
  value,
  onChange,
}: FieldProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.86rem] leading-snug text-t2">
          {label}
        </label>
        <output
          htmlFor={id}
          className="shrink-0 text-[1.05rem] font-extrabold tabular-nums text-t1"
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(cleanNumber(e.target.value))}
        className="mt-1"
      />
      {hint ? <p className="text-[0.72rem] text-t5">{hint}</p> : null}
    </div>
  );
}

function cleanNumber(raw: string): number {
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Uma linha da conta. Natureza a esquerda, valor a direita. */
function Line({
  label,
  detail,
  kind,
  value,
}: {
  label: string;
  detail: string;
  kind: string;
  value: number;
}) {
  return (
    <li className="flex items-start justify-between gap-5 border-b border-line-1 py-3.5">
      <div className="min-w-0">
        <p className="text-[0.88rem] leading-snug text-t2">{label}</p>
        <p className="mt-1 text-[0.72rem] leading-relaxed text-t5">
          <span className="text-t4">{kind}</span> . {detail}
        </p>
      </div>
      <p className="shrink-0 pt-0.5 text-[1rem] font-extrabold tabular-nums text-t1">
        {money(value)}
      </p>
    </li>
  );
}

/* ------------------------------------------------------------------ */

export function Calculator() {
  const [input, setInput] = useState<Inputs>(initial);
  const estimate = useEstimate(input);

  const set =
    <K extends keyof Inputs>(key: K) =>
    (value: number) =>
      setInput((prev) => ({ ...prev, [key]: value }));

  const message =
    `Olá, fiz a conta no site da Nexistown.\n\n` +
    `Agenda potencial: ${money(input.agenda)} por mês\n` +
    `Faltam ${input.missPerTen} de cada 10 pacientes\n` +
    `${number(input.inactive)} pacientes sem retorno há mais de um ano\n` +
    `Ticket médio: ${money(input.ticket)}\n\n` +
    `Deu ${money(estimate.totalN1)} por mês de potencial no primeiro degrau. Quero o diagnóstico gratuito.`;

  return (
    <Section id="a-conta" className="bg-fill-1">
      <Container>
        <SectionHeading
          eyebrow="A conta"
          title={
            <>
              Você não precisa acreditar em mim.{" "}
              <span className="gradient-text">Olha o seu próprio número.</span>
            </>
          }
          lead="Mexa nos controles com os dados da sua clínica. A conta é refeita na hora, sempre no cenário mais conservador que a gente conseguiu montar."
        />

        {/* overflow-clip, e nao hidden, para nao matar o sticky da coluna de entradas */}
        <div className="mt-14 grid gap-px overflow-clip rounded-[4px] bg-line-1 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Entradas, fixas enquanto o resultado rola ao lado */}
          <Reveal className="bg-ink p-[clamp(1.5rem,3vw,2.25rem)]">
            <div className="flex flex-col gap-8 lg:sticky lg:top-28">
              <p className="eyebrow text-t4">Os números da sua clínica</p>

              <Field
                label="Quanto sua agenda fatura com todos os horários ocupados"
                display={money(input.agenda)}
                min={15000}
                max={120000}
                step={1000}
                value={input.agenda}
                onChange={set("agenda")}
                hint="O potencial da agenda cheia, não o que fatura hoje."
              />

              <Field
                label="De cada 10 pacientes que marcam, quantos não aparecem"
                display={`${input.missPerTen} em 10`}
                min={0}
                max={6}
                step={1}
                value={input.missPerTen}
                onChange={set("missPerTen")}
                hint="Se não souber, a média de consultório é 3 em 10."
              />

              <Field
                label="Pacientes cadastrados que não voltam há mais de um ano"
                display={number(input.inactive)}
                min={0}
                max={1200}
                step={20}
                value={input.inactive}
                onChange={set("inactive")}
                hint="Vale o caderno, a ficha e a agenda de papel."
              />

              <Field
                label="Ticket médio de um atendimento"
                display={money(input.ticket)}
                min={150}
                max={1500}
                step={50}
                value={input.ticket}
                onChange={set("ticket")}
              />

              <Field
                label="O que você paga por mês em ferramenta e impulsionamento"
                display={money(input.tools)}
                min={0}
                max={2500}
                step={100}
                value={input.tools}
                onChange={set("tools")}
                hint="Agenda, disparo de mensagem, quem cuida do Instagram."
              />
            </div>
          </Reveal>

          {/* Saidas */}
          <div className="flex flex-col gap-px bg-line-1">
            {/* O buraco */}
            <div className="flex flex-wrap items-center gap-[clamp(1.25rem,3vw,2rem)] bg-ink p-[clamp(1.5rem,3vw,2.25rem)]">
              <ArcGauge
                value={estimate.missRate}
                label={`${input.missPerTen * 10}%`}
                caption="Faltam"
                className="size-[clamp(6.5rem,14vw,8rem)] shrink-0"
              />
              <div className="min-w-[14rem] flex-1">
                <p className="eyebrow text-t4">
                  O que a agenda deixa na mesa hoje
                </p>
                <p className="mt-2 text-[clamp(1.8rem,4vw,2.6rem)] font-black leading-none tracking-[-0.03em] text-t1 tabular-nums">
                  {money(estimate.leftOnTable)}
                </p>
                <p className="mt-2.5 text-[0.82rem] leading-relaxed text-t3">
                  por mês em faturamento que a agenda não realiza. Nada disso
                  aparece como prejuízo em lugar nenhum.
                </p>
              </div>
            </div>

            {/* O que dá pra recuperar */}
            <div className="bg-ink p-[clamp(1.5rem,3vw,2.25rem)]">
              <p className="eyebrow text-t4">
                Potencial de recuperação por mês, no piso conservador
              </p>

              <p className="mt-5 text-[0.8rem] font-bold text-primary">
                Já no Degrau 1, Agenda Cheia
              </p>
              <ul className="mt-3 flex flex-col">
                {estimate.linesN1.map((line) => (
                  <Line key={line.id} {...line} />
                ))}
              </ul>

              {estimate.noShowAlreadyGood ? (
                <p className="mt-5 rounded-[4px] border border-line-2 bg-fill-2 px-4 py-3 text-[0.78rem] leading-relaxed text-t3">
                  Sua taxa de falta já está no patamar que a gente persegue.
                  Aqui o ganho vem dos outros itens, e a conta segue de pé.
                </p>
              ) : null}

              {/* Total do degrau 1 */}
              <div className="mt-7 gradient-border rounded-[4px] bg-fill-3 p-6">
                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                  <div>
                    <p className="eyebrow text-t4">
                      Degrau 1, total estimado por mês
                    </p>
                    <p className="mt-1.5 text-[clamp(2.2rem,5.5vw,3.2rem)] font-black leading-none tracking-[-0.03em] text-primary tabular-nums">
                      {money(estimate.totalN1)}
                    </p>
                  </div>
                  <p className="text-[0.82rem] leading-relaxed text-t3">
                    Contra {money(PRICE_N1)} do plano.
                    {estimate.paysOff ? (
                      <>
                        {" "}
                        <span className="font-bold text-t1">
                          {estimate.multipleN1.toFixed(1).replace(".", ",")}x o
                          que custa
                        </span>
                        , e sobram {money(estimate.profitN1)} no seu caixa.
                      </>
                    ) : (
                      <>
                        {" "}
                        Com esses números a conta ainda não fecha, e eu prefiro
                        te dizer isso agora do que no terceiro mês.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Degrau 2, so aparece quando ha base parada para reativar */}
              {estimate.linesN2.length > 0 ? (
                <>
              <p className="mt-9 text-[0.8rem] font-bold text-primary">
                Quando você sobe para o Degrau 2, Paciente que Volta
              </p>
              <ul className="mt-3 flex flex-col">
                {estimate.linesN2.map((line) => (
                  <Line key={line.id} {...line} />
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 rounded-[4px] border border-line-2 bg-fill-2 px-6 py-5">
                <div className="flex items-baseline gap-3">
                  <span className="eyebrow text-t4">Somando os dois</span>
                  <span className="text-[1.6rem] font-black leading-none tracking-[-0.03em] text-t1 tabular-nums">
                    {money(estimate.totalN2)}
                  </span>
                </div>
                <p className="text-[0.8rem] text-t3">
                  Contra {money(PRICE_N2)} do Degrau 2.{" "}
                  {estimate.multipleN2 >= 1 ? (
                    <span className="font-bold text-t1">
                      {estimate.multipleN2.toFixed(1).replace(".", ",")}x o que
                      custa
                    </span>
                  ) : null}
                </p>
              </div>

              <p className="mt-4 text-[0.75rem] leading-relaxed text-t5">
                A recomendação continua sendo começar pelo Degrau 1. A base
                parada não vai a lugar nenhum, e ela rende mais depois que o
                presente está organizado.
              </p>
                </>
              ) : null}

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Refazer essa conta comigo
                </Button>
                <p className="text-[0.72rem] leading-relaxed text-t5">
                  Leva os seus números direto para a conversa. Sem formulário.
                </p>
              </div>

              <p className="mt-7 border-t border-line-1 pt-5 text-[0.72rem] leading-relaxed text-t5">
                Como a conta é montada: margem de contribuição estimada em 55%,
                queda da falta até 22%, 3% da base inativa voltando por mês, 3
                pacientes novos do Google e 2 que deixam de se perder na demora.
                Receita nova entra sempre pela margem, nunca cheia. Economia
                entra cheia, porque é dinheiro que para de sair. Nenhuma linha é
                contada duas vezes. É estimativa para dimensionar potencial, não
                é promessa de resultado.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
