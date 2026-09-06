import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Calculator } from "@/components/Calculator";
import { Positioning } from "@/components/Positioning";
import { Ladder } from "@/components/Ladder";
import { Process } from "@/components/Process";
import { Founder } from "@/components/Founder";
import { Faq, faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { site } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "MarketingAgency"],
      "@id": `${site.url}/#agencia`,
      name: site.name,
      url: site.url,
      description:
        "Presença digital para clínicas e negócios de agenda em Parnaíba, Piauí. Google Meu Negócio, rotina de confirmação de consulta, WhatsApp organizado, conteúdo e relatório mensal de gestão.",
      areaServed: [
        "Parnaíba, PI",
        "Luís Correia, PI",
        "Buriti dos Lopes, PI",
        "Ilha Grande, PI",
        "Tutóia, MA",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.state,
        addressCountry: "BR",
      },
      founder: { "@type": "Person", name: site.founder },
      knowsLanguage: "pt-BR",
      priceRange: "R$ 1.800 a R$ 3.500 por mês",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "A escada de três degraus",
        itemListElement: [
          { name: "Agenda Cheia", price: "1800" },
          { name: "Paciente que Volta", price: "2700" },
          { name: "Clínica no Comando", price: "3500" },
        ].map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          price: tier.price,
          priceCurrency: "BRL",
          category: "Gestão de presença digital",
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#duvidas`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // O conteudo e estatico e montado aqui no servidor.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      <main id="conteudo" className="flex-1">
        <Hero />
        <Problem />
        <Calculator />
        <Positioning />
        <Ladder />
        <Process />
        <Founder />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
