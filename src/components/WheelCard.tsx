import { useEffect, useRef, useState } from "react";
import type { Category, Item } from "@/data/catalog";
import { SLICE_COLORS } from "@/data/catalog";

type Props = {
  category: Category;
  themeColor: string; // ex: "var(--theme-personagens)"
  result: Item | null;
  onResult: (item: Item) => void;
};

const SIZE = 180;
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
    }, 3200);
  };

  return (
    <div
      className="relative rounded-3xl p-3 flex flex-col items-center bg-white"
      style={{
        border: `4px solid hsl(${themeColor})`,
        boxShadow: `0 8px 0 hsl(${themeColor} / 0.55), 0 16px 26px hsl(${themeColor} / 0.25)`,
      }}
    >
      {/* Engrenagens decorativas em cantos do card */}
      <svg className="absolute animate-spin-slow opacity-30" style={{ top: -10, left: -10, width: 26, height: 26 }} viewBox="0 0 100 100">
        <path fill={`hsl(${themeColor})`} d="M50 10l5 8 9-2 1 9 9 4-4 8 6 7-7 6 4 8-9 4-1 9-9-2-5 8-5-8-9 2-1-9-9-4 4-8-6-7 7-6-4-8 9-4 1-9 9 2z"/>
        <circle cx="50" cy="50" r="14" fill="white" />
      </svg>
      <svg className="absolute animate-spin-slower opacity-30" style={{ bottom: 60, right: -8, width: 22, height: 22 }} viewBox="0 0 100 100">
        <path fill={`hsl(${themeColor})`} d="M50 10l5 8 9-2 1 9 9 4-4 8 6 7-7 6 4 8-9 4-1 9-9-2-5 8-5-8-9 2-1-9-9-4 4-8-6-7 7-6-4-8 9-4 1-9 9 2z"/>
        <circle cx="50" cy="50" r="14" fill="white" />
      </svg>

      {/* Título do módulo */}
      <div
        className="w-full text-center text-white font-display font-extrabold rounded-full py-1.5 mb-2 uppercase tracking-wide text-sm"
        style={{
          background: `linear-gradient(180deg, hsl(${themeColor}) 0%, hsl(${themeColor} / 0.78) 100%)`,
          boxShadow: `0 3px 0 hsl(${themeColor} / 0.55)`,
          border: "2px solid white",
        }}
      >
        {category.title}
      </div>

      {/* Roleta */}
      <div className="relative" style={{ width: SIZE, height: SIZE + 8 }}>
        {/* Ponteiro fixo no topo */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{
            top: -6,
            width: 0, height: 0,
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            borderTop: "26px solid hsl(var(--primary))",
            filter: "drop-shadow(0 2px 2px rgba(0,0,0,.3))",
          }}
        />
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 3s cubic-bezier(.17,.67,.27,1)" : "none",
            filter: "drop-shadow(0 6px 8px rgba(0,0,0,.2))",
          }}
        >
          <circle cx={R} cy={R} r={R} fill="white" />
          {items.map((_, i) => (
            <path
              key={i}
              d={slicePath(i, items.length)}
              fill={SLICE_COLORS[i % SLICE_COLORS.length]}
              stroke="white"
              strokeWidth={3}
            />
          ))}
          {/* Anel externo grosso */}
          <circle cx={R} cy={R} r={R - 3} fill="none" stroke={`hsl(${themeColor})`} strokeWidth={6} />
          <circle cx={R} cy={R} r={R - 9} fill="none" stroke="white" strokeWidth={2} opacity={0.7} />
          {/* Miolo central */}
          <circle cx={R} cy={R} r={14} fill="white" stroke={`hsl(${themeColor})`} strokeWidth={4} />
          <circle cx={R} cy={R} r={6} fill={`hsl(${themeColor})`} />
        </svg>
      </div>

      {/* Resultado / botão */}
      <div className="mt-3 w-full min-h-[86px] flex flex-col items-center justify-center">
        {result ? (
          <div
            className="flex items-center gap-2 rounded-2xl px-3 py-1.5 animate-pop"
            style={{
              background: `linear-gradient(180deg, white 0%, hsl(${themeColor} / 0.12) 100%)`,
              border: `3px solid hsl(${themeColor})`,
              boxShadow: `0 4px 0 hsl(${themeColor} / 0.5)`,
            }}
          >
            <img src={result.image} alt={result.label} className="w-12 h-12 object-contain" />
            <span className="font-display font-extrabold text-sm text-primary leading-tight">
              {result.label}
            </span>
          </div>
        ) : (
          <button
            onClick={spin}
            disabled={spinning}
            className={`btn-yellow text-sm px-4 py-2 ${spinning ? "" : "animate-pulse-soft"}`}
            style={{ minWidth: 170 }}
          >
            {spinning ? "✨ Girando..." : "🎯 Clique para sortear"}
          </button>
        )}
        {result && (
          <button
            onClick={spin}
            disabled={spinning}
            className="mt-1 text-xs text-primary/70 underline hover:text-primary"
          >
            sortear de novo
          </button>
        )}
      </div>
    </div>
  );
};
