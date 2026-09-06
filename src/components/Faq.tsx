import { Container, Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

export const faq = [
  {
    q: "Achei caro.",
    a: "Caro comparado a quê? A média das clínicas paga por volta de R$ 800 por mês em duas ferramentas que ninguém abre, e uma agenda de R$ 50.000 perde perto de R$ 15.000 por mês em falta. O plano de entrada custa R$ 1.800 e o potencial estimado, no pior cenário que a gente conseguiu montar, passa de R$ 3.900. A conta fica aberta na tela, linha por linha.",
  },
  {
    q: "Já tentei agência e não deu certo.",
    a: "Deixa eu adivinhar: fizeram post bonito e cobraram mensalidade. O primeiro entregável daqui é diferente, é medir quantos pacientes faltaram no seu mês passado. Esse número vira a linha de base do contrato. Se ele não cair, você me demite com razão.",
  },
  {
    q: "Não tenho verba agora.",
    a: "O plano não é gasto novo, é troca. Boa parte do que você já paga hoje em ferramenta parada cobre quase metade dele. A outra metade sai da primeira semana de agenda que para de furar. Se ainda assim apertar, existe uma janela de entrada mais barata nos primeiros quatro meses.",
  },
  {
    q: "Meu sobrinho já cuida do meu Instagram.",
    a: "Ótimo, metade do trabalho está resolvida e a gente não mexe nisso. O que ele não faz é o que enche a cadeira: confirmar consulta em D-2 e D-1, chamar o paciente que sumiu há um ano e corrigir o seu perfil no Google. É aí que está o dinheiro.",
  },
  {
    q: "Meu resultado vem de indicação, não de internet.",
    a: "É o melhor sinal que existe, e a gente não quer trocar isso por nada. O problema é o caminho: a indicação chega no seu nome e a pessoa vai ao Google conferir antes de ligar. Se lá o seu perfil tem duas avaliações, sem foto e sem horário, a indicação morre na porta.",
  },
  {
    q: "E se eu quiser parar em três meses?",
    a: "O prazo mínimo é de seis meses porque a posição no Google leva cerca de 90 dias para consolidar e a queda da falta só é mensurável depois de três ciclos de agenda. Parar no terceiro mês é sair exatamente quando começa a render.",
  },
  {
    q: "Quem fica dono das contas e do domínio?",
    a: "Você, desde o primeiro dia. Google Meu Negócio, Instagram, domínio e hospedagem ficam no seu nome e no seu CNPJ. A gente entra como gestor. Se um dia a parceria acabar, você leva tudo com você e nada precisa ser remontado.",
  },
  {
    q: "Vocês atendem qualquer tipo de negócio?",
    a: "Não. Só negócio que vive de horário marcado, com operação física e equipe de duas a cinco pessoas. Clínica odontológica, estética, fisioterapia, barbearia premium, pet shop com banho e tosa, autoescola. É a única forma de conhecer a rotina melhor que o generalista.",
  },
  {
    q: "Preciso falar com meu sócio antes.",
    a: "Faz sentido. Eu mando um resumo de uma página com a conta fechada, para você não ter que explicar de cabeça. Ou apresento para vocês dois em 15 minutos. O que for mais fácil.",
  },
];

export function Faq() {
  return (
    <Section id="duvidas">
      <Container>
        <SectionHeading
          eyebrow="Antes de você perguntar"
          title={
            <>
              As objeções que a gente mais ouve,{" "}
              <span className="gradient-text">respondidas sem rodeio.</span>
            </>
          }
        />

        <div className="mt-12 flex flex-col">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details className="group border-b border-line-1 first:border-t">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-h4 leading-snug text-t1 transition-colors duration-150 hover:text-primary [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden
                    className="relative mt-1.5 grid size-5 shrink-0 place-items-center"
                  >
                    <span className="absolute h-0.5 w-full rounded bg-current" />
                    <span className="absolute h-0.5 w-full rotate-90 rounded bg-current transition-transform duration-300 [transition-timing-function:var(--ease-apple)] group-open:rotate-0" />
                  </span>
                </summary>
                <p className="measure pb-7 text-[0.92rem] leading-relaxed text-t3">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
