import { Container, Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

const steps = [
  {
    when: "Dia 1 . 15 minutos",
    title: "O raio-x, por telefone",
    body: "Cinco perguntas sobre a sua agenda. Nada de apresentação, nada de proposta. Com as respostas eu monto o diagnóstico da clínica.",
    yours: "15 minutos no telefone",
  },
  {
    when: "Dia 3 . 30 minutos",
    title: "A conta na mesa",
    body: "Volto com duas tabelas montadas com os seus números, não com os meus exemplos. Se algum número estiver errado, a gente corrige ali na hora.",
    yours: "30 minutos, no consultório ou por chamada",
  },
  {
    when: "Semana 1",
    title: "A linha de base, antes de mexer em nada",
    body: "Primeiro a gente registra como a clínica está hoje. Depois o perfil do Google sai do ar errado e as assinaturas que ninguém abre são canceladas.",
    yours: "30 minutos para passar os acessos",
  },
  {
    when: "Todo mês",
    title: "Relatório de número, não de alcance",
    body: "Origem do paciente, ligações e rotas vindas do Google, taxa de falta antes e depois. Em duas páginas, revisadas com você.",
    yours: "15 minutos por mês",
  },
];

export function Process() {
  return (
    <Section id="como-comeca">
      <Container>
        <SectionHeading
          eyebrow="Como começa"
          title={
            <>
              Da primeira ligação ao primeiro relatório,{" "}
              <span className="gradient-text">
                sem você virar gestor de marketing.
              </span>
            </>
          }
          lead="A execução é nossa e da sua recepção, que já está aí. Da sua parte são 30 minutos no começo e 15 minutos por mês. Você não precisa aprender nada."
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[4px] bg-line-1 sm:grid-cols-2">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={i * 80}
              className="relative flex flex-col gap-3 bg-ink p-[clamp(1.5rem,3vw,2.25rem)]"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#E35205,#7E2A00)] text-[0.8rem] font-black text-bone tabular-nums">
                  {i + 1}
                </span>
                <span className="eyebrow text-t4">{step.when}</span>
              </div>

              <h3 className="mt-2 text-h4 leading-snug text-t1">
                {step.title}
              </h3>
              <p className="text-[0.88rem] leading-relaxed text-t3">
                {step.body}
              </p>

              <p className="mt-3 flex items-center gap-2 border-t border-line-1 pt-4 text-[0.78rem] text-t4">
                <span className="font-bold text-primary">Da sua parte:</span>
                {step.yours}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={140}>
          <p className="mt-8 text-[0.78rem] leading-relaxed text-t5">
            Posição no Google leva cerca de 90 dias para consolidar, e a queda
            da falta só é mensurável depois de três ciclos de agenda. Por isso o
            prazo mínimo é de seis meses. Quem promete menos que isso está
            chutando.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
