const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const decimal = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/** R$ 15.000 */
export function money(value: number): string {
  return brl.format(Math.round(value));
}

/** 15.000 */
export function number(value: number): string {
  return decimal.format(Math.round(value));
}

/** Arredonda para a centena mais proxima, para nao passar falsa precisao. */
export function roundToHundred(value: number): number {
  return Math.round(value / 100) * 100;
}
