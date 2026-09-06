import Image from "next/image";
import { Container, Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

const facts = [
  {
    value: "1",
    label: "Nicho atendido",
    detail: "Só negócio que vive de horário marcado",
  },
  {
    value: "11",
    label: "Pilares no método",
    detail: "Sete deles cortam custo",
  },
  {
    value: "3",
    label: "Clínicas por vez",
    detail: "É o teto real da operação hoje",
  },
  { value: "0", label: "Promessa de alcance", detail: "Relatório é de número" },
];

export function Founder() {
  return (
    <Section id="quem-faz" className="bg-fill-1">
      <Container>
        <div className="grid gap-[clamp(3rem,6vw,5rem)] lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Quem está por trás"
              title={
                <>
                  Um técnico cuidando da sua presença digital,{" "}
                  <span className="gradient-text">
                    não um vendedor de post.
                  </span>
                </>
              }
            />

            <div className="measure mt-8 flex flex-col gap-5 text-t3">
              <Reveal delay={80}>
                <p>
                  A Nexistown nasceu de uma constatação simples: em Parnaíba,
                  quase toda clínica boa tem nota cinco no Google e quase
                  nenhuma aparece quando alguém procura. O serviço é excelente e
                  a vitrine está vazia. A gente resolve os dois lados disso, e
                  mede.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p>
                  Quem toca é Kaue, analista de desenvolvimento cloud, com
                  background técnico em software e infraestrutura. Não é o
                  perfil comum de dono de agência na região, e é de propósito: o
                  que enche a sua cadeira não é criatividade, é processo,
                  medição e uma rotina que a recepção consegue executar toda
                  semana.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  Trabalhamos só com negócios que vivem de horário marcado,
                  porque é onde o desperdício se repete igual em toda clínica e
                  pode virar processo. Clínica odontológica, estética,
                  fisioterapia, barbearia premium, pet shop com banho e tosa,
                  autoescola.
                </p>
              </Reveal>
            </div>

            <Reveal delay={260}>
              <blockquote className="mt-10 border-l-2 border-primary py-1 pl-6">
                <p className="text-h4 leading-snug text-t1 text-balance">
                  “O primeiro entregável daqui é medir quantos pacientes
                  faltaram no seu mês passado. Se eu não derrubar esse número,
                  você me demite com razão.”
                </p>
              </blockquote>
            </Reveal>
          </div>

          <Reveal delay={160} className="w-full">
            <div className="gradient-border rounded-[4px] bg-fill-2 p-[clamp(1.75rem,3vw,2.5rem)]">
              <Image
                src="/brand/n-logo-stacked-white.png"
                alt="Nexistown"
                width={1220}
                height={848}
                className="h-auto w-36"
              />

              <p className="mt-7 text-[0.9rem] leading-relaxed text-t3">
                Atendemos Parnaíba e o entorno: Luís Correia, Buriti dos Lopes,
                Ilha Grande e Tutóia, no Maranhão.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] bg-line-1">
                {facts.map((fact) => (
                  <div key={fact.label} className="bg-ink p-5">
                    <dd className="text-[1.9rem] font-black leading-none tracking-[-0.03em] text-primary tabular-nums">
                      {fact.value}
                    </dd>
                    <dt className="eyebrow mt-2.5 text-t2">{fact.label}</dt>
                    <p className="mt-1.5 text-[0.72rem] leading-relaxed text-t5">
                      {fact.detail}
                    </p>
                  </div>
                ))}
              </dl>

              <p className="mt-7 border-t border-line-1 pt-5 text-[0.75rem] leading-relaxed text-t5">
                Odontologia e fisioterapia têm conselho profissional com norma
                de publicidade. Nada de antes e depois, nada de promessa de
                resultado. Conhecer a norma é parte do trabalho.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
