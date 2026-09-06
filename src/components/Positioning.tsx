import { Container, Section, SectionHeading } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

const columns = ["Agência generalista", "Freelancer", "Nexistown"] as const;

const rows = [
  {
    criterion: "Conhece a rotina de uma agenda",
    values: ["Não", "Não", "Sim, é o único nicho que atendemos"],
  },
  {
    criterion: "Prova o retorno com conta na mesa",
    values: [
      "Relatório de alcance",
      "Nenhuma prova",
      "Duas tabelas com o seu número",
    ],
  },
  {
    criterion: "Corta custo além de gerar venda",
    values: [
      "Só gera venda",
      "Só entrega peça",
      "Sete dos onze pilares cortam custo",
    ],
  },
  {
    criterion: "Conhece a norma do conselho profissional",
    values: ["Às vezes", "Não", "Sim, é requisito do nicho"],
  },
  {
    criterion: "Titularidade das contas e do domínio",
    values: [
      "Costuma reter",
      "Informal",
      "Tudo no seu nome, desde o primeiro dia",
    ],
  },
  {
    criterion: "Continuidade",
    values: [
      "Alta rotatividade",
      "Some",
      "Contrato com prazo e relatório fixo",
    ],
  },
] as const;

export function Positioning() {
  return (
    <Section id="a-terceira-opcao">
      <Container>
        <SectionHeading
          eyebrow="A terceira opção"
          title={
            <>
              Em Parnaíba você tem dois extremos.{" "}
              <span className="gradient-text">
                A gente é o meio que faltava.
              </span>
            </>
          }
          lead="De um lado, a agência que atende de loja de roupa a político com o mesmo pacote. Do outro, o freelancer que faz post por trezentos reais e some. A Nexistown é a que chega com a conta pronta."
        />

        {/* Tabela, telas medias para cima */}
        <Reveal delay={120} className="mt-14 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Comparação entre agência generalista, freelancer e Nexistown
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[26%] pb-5 pr-6" />
                {columns.map((col) => {
                  const isBrand = col === "Nexistown";
                  return (
                    <th
                      key={col}
                      scope="col"
                      className={`eyebrow pb-5 pr-6 align-bottom ${
                        isBrand ? "text-primary" : "text-t4"
                      }`}
                    >
                      {col}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.criterion} className="border-t border-line-1">
                  <th
                    scope="row"
                    className="py-5 pr-6 align-top text-[0.9rem] font-semibold leading-snug text-t1"
                  >
                    {row.criterion}
                  </th>
                  {row.values.map((value, i) => {
                    const isBrand = i === row.values.length - 1;
                    return (
                      <td
                        key={columns[i]}
                        className={`py-5 pr-6 align-top text-[0.86rem] leading-relaxed ${
                          isBrand
                            ? "bg-primary/6 pl-4 font-semibold text-t1"
                            : "text-t4"
                        }`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Empilhado, no mobile */}
        <div className="mt-12 flex flex-col gap-px overflow-hidden rounded-[4px] bg-line-1 md:hidden">
          {rows.map((row, i) => (
            <Reveal key={row.criterion} delay={i * 60} className="bg-ink p-6">
              <p className="text-h4 leading-snug text-t1">{row.criterion}</p>
              <dl className="mt-4 flex flex-col gap-2.5">
                {row.values.map((value, j) => {
                  const isBrand = j === row.values.length - 1;
                  return (
                    <div key={columns[j]} className="flex flex-col gap-0.5">
                      <dt
                        className={`eyebrow ${isBrand ? "text-primary" : "text-t5"}`}
                      >
                        {columns[j]}
                      </dt>
                      <dd
                        className={`text-[0.86rem] leading-snug ${
                          isBrand
                            ? "font-semibold text-t1"
                            : "text-t4"
                        }`}
                      >
                        {value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
