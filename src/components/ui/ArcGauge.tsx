type ArcGaugeProps = {
  /** Fracao preenchida, de 0 a 1. */
  value: number;
  /** Rotulo grande no centro. */
  label: string;
  /** Legenda abaixo do rotulo. */
  caption?: string;
  className?: string;
};

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Respiro em cada ponta do arco, para ecoar o corte do simbolo da marca. */
const GAP = 3.2;

/**
 * Anel com segmento em laranja. E o simbolo da Nexistown virando dado:
 * a marca ja e um arco de porcentagem.
 */
export function ArcGauge({
  value,
  label,
  caption,
  className = "",
}: ArcGaugeProps) {
  const clamped = Math.min(Math.max(value, 0), 1);
  const arc = Math.max(CIRCUMFERENCE * clamped - GAP * 2, 0.5);

  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="size-full -rotate-90"
        role="presentation"
      >
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          className="text-bone/8"
        />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="#E35205"
          strokeWidth="9"
          strokeLinecap="butt"
          strokeDasharray={`${arc} ${CIRCUMFERENCE - arc}`}
          strokeDashoffset={-GAP}
          className="transition-[stroke-dasharray] duration-700 [transition-timing-function:var(--ease-apple)]"
        />
      </svg>

      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-[clamp(1.6rem,4.5vw,2.4rem)] font-black leading-none tracking-[-0.03em] text-t1 tabular-nums">
          {label}
        </span>
        {caption ? (
          <span className="eyebrow mt-2 text-t4">{caption}</span>
        ) : null}
      </div>
    </div>
  );
}
