/**
 * Configuracao central da landing page.
 *
 * ATENCAO: os campos marcados com TODO sao placeholders. Troque antes de
 * publicar, senao os botoes de contato levam para lugar nenhum.
 */
export const site = {
  name: "Nexistown",
  domain: "nexistown.com.br",
  url: "https://nexistown.com.br",

  // TODO: numero real da agencia, formato internacional, so digitos.
  whatsapp: "5586900000000",
  // TODO: e-mail real da agencia.
  email: "contato@nexistown.com.br",

  city: "Parnaíba",
  state: "PI",
  region: "Parnaíba, Luís Correia, Buriti dos Lopes, Ilha Grande e Tutóia",
  founder: "Kaue Leal",

  tagline: "Presença digital para negócios de agenda em Parnaíba.",
} as const;

/** Monta o link do WhatsApp com a mensagem ja preenchida. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  "Olá, vim pelo site da Nexistown e quero o diagnóstico gratuito da minha clínica.";
