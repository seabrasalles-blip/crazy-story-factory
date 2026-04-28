import { useEffect, useRef, useState } from "react";
import type { Category, Item } from "@/data/catalog";
import { SLICE_COLORS } from "@/data/catalog";

type Props = {
  category: Category;
  themeColor: string; // ex: "var(--theme-personagens)"
  result: Item | null;
  onResult: (item: Item) => void;
};

const SIZE = 170;
const R = SIZE / 2;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function slicePath(index: number, total: number) {
  const startAngle = (360 / total) * index;
  const endAngle = (360 / total) * (index + 1);
  const start = polarToCartesian(R, R, R, endAngle);
  const end = polarToCartesian(R, R, R, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${R} ${R} L ${start.x} ${start.y} A ${R} ${R} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

// Parafusos amarelos no anel externo
const SCREW_POSITIONS = [0, 60, 120, 180, 240, 300];

export const WheelCard = ({ category, themeColor, result, onResult }: Props) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); }, []);

  const items = category.items;
  const sliceAngle = 360 / items.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const winnerIndex = Math.floor(Math.random() * items.length);
    const turns = 5 + Math.floor(Math.random() * 3);
    const targetCenter = sliceAngle * winnerIndex + sliceAngle / 2;
    const finalRotation = rotation + turns * 360 + (360 - (rotation % 360)) - targetCenter;

    setRotation(finalRotation);

    timeoutRef.current = window.setTimeout(() => {
      onResult(items[winnerIndex]);
      setSpinning(false);
    }, 3500);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Tubo conectando ao topo da fábrica */}
      <svg
        className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
        width="40" height="48" viewBox="0 0 40 48"
      >
        <rect x="14" y="0" width="12" height="48" fill={`hsl(${themeColor})`} stroke="hsl(var(--contorno))" strokeWidth="2.5" />
        <rect x="10" y="4" width="20" height="6" fill="hsl(var(--contorno))" rx="2" />
        <rect x="10" y="38" width="20" height="6" fill="hsl(var(--contorno))" rx="2" />
        {/* Bolha mágica subindo (decorativa) */}
        {!result && (
          <circle cx="20" cy="40" r="3" fill={`hsl(${themeColor})`} className="animate-bubble" opacity="0.9" />
        )}
      </svg>

      {/* Carcaça da máquina */}
      <div
        className="relative rounded-3xl px-3 pt-3 pb-3 flex flex-col items-center"
        style={{
          background: `linear-gradient(180deg, hsl(${themeColor}) 0%, hsl(${themeColor} / 0.78) 100%)`,
          border: "4px solid hsl(var(--contorno))",
          boxShadow: "0 6px 0 hsl(var(--contorno)), 0 14px 24px hsl(var(--contorno) / 0.4)",
        }}
      >
        {/* Parafusos nos cantos */}
        {[
          { top: 6, left: 6 }, { top: 6, right: 6 },
          { bottom: 6, left: 6 }, { bottom: 6, right: 6 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              ...pos,
              background: "hsl(var(--amarelo))",
              border: "1.5px solid hsl(var(--contorno))",
            }}
          />
        ))}

        {/* Etiqueta título */}
        <div
          className="px-3 py-1 rounded-full font-display font-extrabold text-xs uppercase tracking-wider mb-2"
          style={{
            background: "hsl(var(--off-white))",
            color: "hsl(var(--contorno))",
            border: "2.5px solid hsl(var(--contorno))",
            boxShadow: "0 2px 0 hsl(var(--contorno))",
          }}
        >
          {category.title}
        </div>

        {/* Roleta com LEDs laterais */}
        <div className="relative flex items-center gap-1.5">
          {/* LED esquerdo */}
          <div
            className={`w-2.5 h-2.5 rounded-full ${result ? "" : "animate-led"}`}
            style={{
              background: result ? "hsl(var(--verde))" : "hsl(var(--amarelo))",
              border: "1.5px solid hsl(var(--contorno))",
              boxShadow: result
                ? "0 0 8px hsl(var(--verde))"
                : "0 0 6px hsl(var(--amarelo))",
            }}
          />

          <div className="relative" style={{ width: SIZE, height: SIZE + 6 }}>
            {/* Ponteiro fixo no topo */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{
                top: -4,
                width: 0, height: 0,
                borderLeft: "13px solid transparent",
                borderRight: "13px solid transparent",
                borderTop: "22px solid hsl(var(--amarelo))",
                filter: "drop-shadow(0 2px 0 hsl(var(--contorno)))",
              }}
            />
            <svg
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? "transform 3.4s cubic-bezier(.17,.67,.32,1.27)"
                  : "none",
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,.35))",
              }}
            >
              <circle cx={R} cy={R} r={R} fill="hsl(var(--off-white))" />
              {items.map((_, i) => (
                <path
                  key={i}
                  d={slicePath(i, items.length)}
                  fill={SLICE_COLORS[i % SLICE_COLORS.length]}
                  stroke="hsl(var(--off-white))"
                  strokeWidth={2}
                />
              ))}
              {/* Anel externo escuro com parafusos amarelos */}
              <circle cx={R} cy={R} r={R - 2} fill="none" stroke="hsl(var(--contorno))" strokeWidth={5} />
              {SCREW_POSITIONS.map((deg) => {
                const p = polarToCartesian(R, R, R - 2, deg);
                return (
                  <circle
                    key={deg}
                    cx={p.x}
                    cy={p.y}
                    r={3.2}
                    fill="hsl(var(--amarelo))"
                    stroke="hsl(var(--contorno))"
                    strokeWidth={1.2}
                  />
                );
              })}
              {/* Miolo central */}
              <circle cx={R} cy={R} r={16} fill="hsl(var(--off-white))" stroke="hsl(var(--contorno))" strokeWidth={3} />
              <circle cx={R} cy={R} r={6} fill={`hsl(${themeColor})`} stroke="hsl(var(--contorno))" strokeWidth={1.5} />
            </svg>
          </div>

          {/* LED direito */}
          <div
            className={`w-2.5 h-2.5 rounded-full ${result ? "" : "animate-led"}`}
            style={{
              background: result ? "hsl(var(--verde))" : "hsl(var(--amarelo))",
              border: "1.5px solid hsl(var(--contorno))",
              boxShadow: result
                ? "0 0 8px hsl(var(--verde))"
                : "0 0 6px hsl(var(--amarelo))",
              animationDelay: ".4s",
            }}
          />
        </div>

        {/* Resultado / botão */}
        <div className="mt-2.5 w-full min-h-[80px] flex flex-col items-center justify-center">
          {result ? (
            <div
              className="flex items-center gap-2 rounded-2xl px-2.5 py-1.5 animate-pop"
              style={{
                background: "hsl(var(--off-white))",
                border: "3px solid hsl(var(--contorno))",
                boxShadow: "0 4px 0 hsl(var(--contorno))",
                transform: "rotate(-2deg)",
              }}
            >
              <img src={result.image} alt={result.label} className="w-11 h-11 object-contain" />
              <span className="font-display font-extrabold text-sm leading-tight" style={{ color: "hsl(var(--contorno))" }}>
                {result.label}
              </span>
            </div>
          ) : (
            <button
              onClick={spin}
              disabled={spinning}
              className={`btn-yellow text-sm px-3.5 py-2 ${spinning ? "" : "animate-pulse-soft"}`}
              style={{ minWidth: 150 }}
            >
              {spinning ? "✨ Girando..." : "🎯 Girar"}
            </button>
          )}
          {result && (
            <button
              onClick={spin}
              disabled={spinning}
              className="mt-1 text-[11px] underline font-bold"
              style={{ color: "hsl(var(--off-white))" }}
            >
              sortear de novo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
