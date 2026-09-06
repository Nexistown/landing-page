import { Button } from "./ui/Button";
import { Container, Eyebrow } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { site, whatsappLink } from "@/lib/site";

const questions = [
  "De cada 10 pacientes que marcam, quantos não aparecem?",
  "Quanto vale, em média, uma consulta que fura?",
  "Quanto você paga por mês em ferramenta de agenda, de mensagem e em quem cuida do Instagram?",
  "Quantos pacientes você tem cadastrados, e quantos não voltam há mais de um ano?",
  "Quando alguém manda mensagem no WhatsApp, quanto tempo leva para responder?",
];

const message =
  "Olá, quero o diagnóstico gratuito da Nexistown para a minha clínica em " +
  site.city +
  ".";

export function FinalCta() {
  return (
    <section
      id="diagnostico"
      className="relative overflow-hidden border-t border-line-1 py-[clamp(4.5rem,9vw,8rem)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-[30rem] left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(227,82,5,0.18),transparent_62%)] animate-drift" />
      </div>

      <Container>
        <div className="grid gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <Eyebrow>Diagnóstico gratuito</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-h1 text-t1 text-balance">
                Seu paciente já te elogia.{" "}
                <span className="gradient-text">
                  O Google é que não está contando isso pra cidade.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="measure text-t3">
                São 15 minutos por telefone e eu não vou te vender nada na
                primeira conversa. Cinco perguntas, e com as respostas eu monto
                o raio-x da clínica. Se fizer sentido, a gente marca meia hora
                para eu te mostrar a conta fechada. Se não fizer, o raio-x fica
                com você de qualquer jeito.
              </p>
            </Reveal>

            <Reveal delay={240} className="w-full">
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Button
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                >
                  Falar no WhatsApp agora
                </Button>
                <Button
                  href={`mailto:${site.email}`}
                  variant="outline"
                  size="lg"
                >
                  Prefiro por e-mail
                </Button>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-[0.78rem] text-t4">
                Atendemos três clínicas por vez. É o teto real de quem executa,
                e a gente prefere avisar antes.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="w-full">
            <div className="gradient-border rounded-[4px] bg-fill-2 p-[clamp(1.75rem,3vw,2.5rem)] backdrop-blur-sm">
              <p className="eyebrow text-t4">As cinco perguntas do raio-x</p>
              <p className="mt-4 text-[0.86rem] leading-relaxed text-t3">
                São essas. Nenhuma pegadinha, nenhuma apresentação de slides.
              </p>

              <ol className="mt-7 flex flex-col gap-px overflow-hidden rounded-[4px] bg-line-1">
                {questions.map((question, i) => (
                  <li key={question} className="flex gap-4 bg-ink px-5 py-4">
                    <span className="text-[0.72rem] font-black text-primary tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.86rem] leading-snug text-t2">
                      {question}
                    </span>
                  </li>
                ))}
              </ol>

              <p className="mt-6 text-[0.75rem] leading-relaxed text-t5">
                Se você não souber alguma resposta de cabeça, tudo bem. Não
                saber já é parte do diagnóstico.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
