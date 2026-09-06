# Nexistown . Landing page

Landing page de conversão da **Nexistown**, agência de presença digital para negócios de
agenda em Parnaíba, Piauí.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · página 100% estática.

---

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção, prerenderizado como estático
npm start
npm run lint
```

Requer Node 22. Se você usa `mise`, o runtime já está declarado no `~/.tool-versions`.

---

## Antes de publicar

Os contatos são placeholders. Troque os dois em [src/lib/site.ts](src/lib/site.ts):

```ts
whatsapp: "5586900000000",              // TODO: número real, só dígitos
email:    "contato@nexistown.com.br",   // TODO: e-mail real
```

Todos os CTAs da página montam um link `wa.me` com a mensagem já preenchida, inclusive o
da calculadora, que envia os números que o visitante mexeu. Sem número certo, nenhum
botão funciona.

Confira também `url` no mesmo arquivo: ele alimenta o `metadataBase`, o Open Graph e o
JSON-LD.

---

## Estrutura

```
src/
├── app/
│   ├── globals.css     Tokens do Design System em @theme, utilitários e movimento
│   ├── layout.tsx      Fonte Archivo, metadata, SEO, tema escuro
│   └── page.tsx        Montagem das seções + JSON-LD (ProfessionalService e FAQPage)
├── components/
│   ├── Header.tsx      Fixo, com menu dropdown abaixo de 1024px
│   ├── Hero.tsx        Headline, subheadline, CTA e cartão de raio-x
│   ├── Problem.tsx     O buraco invisível, as 5 dores literais do cliente
│   ├── Calculator.tsx  A conta interativa (client component)
│   ├── Positioning.tsx A terceira opção, matriz de categoria
│   ├── Ladder.tsx      Os três degraus, com os 11 pilares
│   ├── Process.tsx     Como começa, 4 marcos
│   ├── Founder.tsx     Autoridade do fundador e escopo de atuação
│   ├── Faq.tsx         Mapa de objeções em <details> nativo
│   ├── FinalCta.tsx    Fechamento e as 5 perguntas do raio-x
│   ├── Footer.tsx      Navegação, contato e aviso de estimativa
│   ├── StickyCta.tsx   Barra fixa de CTA, só no mobile
│   └── ui/             Button, Section, Reveal, ArcGauge
└── lib/
    ├── site.ts         Configuração central e montagem do link de WhatsApp
    └── format.ts       Moeda e número em pt-BR
```

---

## Design System

Tokens espelhados de `../design-system/templates/av-design-system/av-design-system-spec.md`
e declarados em `@theme` no `globals.css`. Os logos oficiais estão em `public/brand/`.

| Token | Valor |
|---|---|
| `--color-primary` | `#E35205` |
| `--color-accent` | `#FF6E26` |
| `--color-deep` | `#7E2A00` |
| `--color-deep-hover` | `#9C3400` |
| `--color-ink` | `#0E1116` |
| `--color-bone` | `#F4F4F1` |

Família única **Archivo**, 300 a 900, carregada por `next/font`. Container de 74rem, raio
de 4px, alvos de toque de no mínimo 44px.

A página é **comprometida com o tema escuro**, que é o uso principal da marca. A escala de
texto (`t1` a `t5`) e as superfícies (`fill-1` a `fill-3`, `line-1`, `line-2`) seguem as
opacidades do spec.

> Atenção ao editar: **não use a classe `overline`**. Ela colide com o utilitário nativo do
> Tailwind (`text-decoration: overline`) e desenha um risco em cima do texto. A classe da
> casa para etiqueta em caixa alta é **`eyebrow`**.

### Motivo visual

O símbolo da Nexistown já é um arco de porcentagem. O componente
[ArcGauge](src/components/ui/ArcGauge.tsx) transforma isso em dado: o mesmo anel, com o
segmento laranja mostrando a taxa de falta da clínica.

---

## A calculadora

É o centro de conversão da página, e existe porque o gatilho de compra do nicho é ver o
próprio número, não o portfólio da agência.

Todas as premissas ficam em constantes no topo de
[Calculator.tsx](src/components/Calculator.tsx), sempre no **cenário conservador**:

| Premissa | Valor |
|---|---|
| Margem de contribuição | 55% |
| Meta de falta | 22% (a média de mercado parte de 30%) |
| Base inativa que volta por mês | 3% |
| Pacientes novos do Google por mês | 3 |
| Pacientes salvos da demora na resposta | 2 |
| Ticket da primeira consulta | 78% do ticket de retorno |
| Corte na conta de ferramentas | 50% |

Regras que o código respeita e que **não devem ser afrouxadas** em edições futuras:

- Receita nova entra pela **margem**, nunca cheia. Economia entra cheia, porque é dinheiro
  que para de sair do caixa.
- **Nenhuma linha é contada duas vezes.** As linhas são separadas pelo degrau que as
  entrega: reativação da base é Degrau 2 e não pode ser somada contra o preço do Degrau 1.
- Linha com valor zero **não aparece na tela**.
- Se a conta não fechar contra o preço do plano, a página **diz isso**, em vez de esconder.
- Tudo é rotulado como **estimativa e potencial**. Nunca como promessa de resultado.

---

## Regras de comunicação aplicadas

A copy segue a seção 14 da estratégia:

- Sem travessão. Frases curtas. Bullets com hífen. Valores com separador de milhar.
- Linguagem do nicho: agenda, cadeira, horário, paciente, orçamento, recepção, falta,
  retorno, recall.
- Palavras banidas do texto visível: lead, funil, conversão, engajamento, ROAS, nutrição.
  A palavra "alcance" só aparece em contraste ("relatório de número, não de alcance").
- Nada de promessa de resultado e nada de prazo abaixo de 90 dias para o Google.
- Nenhum serviço fora do escopo vendável hoje é citado: sem CRM, sem e-mail marketing, sem
  automação de vendas, sem plataforma de atendimento.
- Sem case, sem depoimento e sem número de cliente inventado. A prova é a conta.

---

## Acessibilidade e SEO

- HTML semântico, um `h1` por página, hierarquia de headings contínua.
- Skip link, `aria-expanded` e `aria-controls` no menu, labels em todos os campos.
- `prefers-reduced-motion` desliga as animações e o scroll suave.
- JSON-LD com `ProfessionalService` (área de atuação, catálogo de ofertas) e `FAQPage`
  montado a partir do mesmo array que renderiza a seção de dúvidas.
