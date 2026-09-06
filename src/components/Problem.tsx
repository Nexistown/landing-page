import { Container, Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

const pains = [
  {
    quote: "Marca e não vem.",
    cost: "A falta média é de 30%. Numa agenda de R$ 50.000, são R$ 15.000 por mês que não voltam.",
  },
  {
    quote: "O povo manda mensagem e eu não dou conta de responder.",
    cost: "Paciente que espera resposta marca em outro lugar. E não avisa que foi embora.",
  },
  {
    quote: "Tenho um monte de paciente antigo que sumiu.",
    cost: "Uma base parada é agenda já conquistada, esperando um chamado que nunca sai.",
  },
  {
    quote: "Não sei se o que eu gasto em anúncio volta.",
    cost: "Impulsionamento avulso sai do caixa todo mês sem ninguém conferir o retorno.",
  },
  {
    quote: "Minha clínica parece amadora perto da concorrente.",
    cost: "A indicação chega no seu nome e vai ao Google conferir. Lá seu perfil tem duas avaliações.",
  },
];

export function Problem() {
  return (
    <Section id="o-buraco">
      <Container>
        <SectionHeading
          eyebrow="O buraco invisível"
          title={
            <>
              Movimento a clínica tem. O que não tem é{" "}
              <span className="gradient-text">o que devia sobrar.</span>
            </>
          }
          lead="Quase nenhum dono de consultório perde receita por falta de paciente. Perde na própria operação, em cinco lugares que ninguém lança em planilha nenhuma."
        />

        <Reveal delay={120}>
          <blockquote className="relative mt-14 border-l-2 border-primary py-2 pl-6 sm:pl-8">
            <p className="text-h3 font-medium text-t1 text-balance sm:text-[1.6rem] sm:leading-snug">
              “Eu trabalho o mês inteiro, a clínica vive cheia de movimento, e
              no fim do mês não sobra o que devia sobrar. E eu não sei dizer
              onde está vazando.”
            </p>
            <footer className="eyebrow mt-4 text-t4">
              O que a gente mais ouve em Parnaíba
            </footer>
          </blockquote>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[4px] bg-line-1 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map((pain, i) => (
            <Reveal
              key={pain.quote}
              as="li"
              delay={i * 70}
              className="group flex flex-col gap-4 bg-ink p-7 transition-colors duration-300 hover:bg-fill-2"
            >
              <span
                aria-hidden
                className="text-[0.7rem] font-black tabular-nums text-primary"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-h4 leading-snug text-t1 text-balance">
                “{pain.quote}”
              </p>
              <p className="text-[0.86rem] leading-relaxed text-t3">
                {pain.cost}
              </p>
            </Reveal>
          ))}

          <Reveal
            as="li"
            delay={pains.length * 70}
            className="flex flex-col justify-center gap-3 bg-fill-3 p-7"
          >
            <p className="text-h4 leading-snug text-t1">
              Nenhum desses cinco se resolve com post bonito.
            </p>
            <p className="text-[0.86rem] leading-relaxed text-t3">
              Todos se resolvem com rotina, com o perfil certo no Google e com
              alguém medindo o número todo mês.
            </p>
          </Reveal>
        </ul>
      </Container>
    </Section>
  );
}
