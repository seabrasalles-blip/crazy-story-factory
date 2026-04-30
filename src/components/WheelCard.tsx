import { useEffect, useRef, useState } from "react";
import type { Category, Item } from "@/data/catalog";
import { SLICE_COLORS } from "@/data/catalog";

type Props = {
  category: Category;
  themeColor?: string;
  result: Item | null;
  onResult: (item: Item) => void;
};

const SIZE = 170;
const R = SIZE / 2;

const CARD_COLORS: Record<string, string> = {
  personagens: "#FF4F93",
  cenarios: "#22B8E8",
  amigos: "#7A35D8",
  viloes: "#FF8A00",
  emocoes: "#FFD23F",
};

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

export const WheelCard = ({ category, result, onResult }: Props) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const items = category.items;
  const sliceAngle = 360 / items.length;
  const mainColor = CARD_COLORS[category.key] ?? "#7A35D8";

  const spin = () => {
    if (spinning) return;

    setSpinning(true);

    const winnerIndex = Math.floor(Math.random() * items.length);
    const turns = 5 + Math.floor(Math.random() * 3);
    const targetCenter = sliceAngle * winnerIndex + sliceAngle / 2;

    const finalRotation =
      rotation + turns * 360 + (360 - (rotation % 360)) - targetCenter;

    setRotation(finalRotation);

    timeoutRef.current = window.setTimeout(() => {
      onResult(items[winnerIndex]);
      setSpinning(false);
    }, 3200);
  };

  return (
    <div
      className="wheel-card flex flex-col items-center justify-between"
      style={{
        background: `linear-gradient(180deg, ${mainColor} 0%, ${mainColor}dd 100%)`,
        minHeight: 430,
        width: "100%",
      }}
    >
      <div className="wheel-card-title">{category.title}</div>

      <div className="relative" style={{ width: SIZE, height: SIZE + 8 }}>
        <div className="roulette-pointer" />

        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 3.2s cubic-bezier(.17,.67,.32,1.18)"
              : "none",
            filter: spinning
              ? "drop-shadow(0 6px 8px rgba(0,0,0,.35))"
              : "drop-shadow(0 0 12px rgba(255, 210, 63, 0.8))",
          }}
        >
          {items.map((_, i) => (
            <path
              key={i}
              d={slicePath(i, items.length)}
              fill={SLICE_COLORS[i % SLICE_COLORS.length]}
              stroke="white"
              strokeWidth={2}
            />
          ))}

          <circle
            cx={R}
            cy={R}
            r={R - 3}
            fill="none"
            stroke="#1D2540"
            strokeWidth={6}
          />

          <circle
            cx={R}
            cy={R}
            r={R - 13}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={4}
          />

          <circle
            cx={R}
            cy={R}
            r={18}
            fill="#FFF8ED"
            stroke="#1D2540"
            strokeWidth={3}
          />

          <circle
            cx={R}
            cy={R}
            r={8}
            fill={mainColor}
            stroke="white"
            strokeWidth={2}
          />
        </svg>
      </div>

      <div className="mt-4 w-full flex flex-col items-center justify-center">
        {result ? (
          <div className="result-chip flex flex-col items-center gap-1">
            <div
              style={{
                background: "white",
                borderRadius: 12,
                padding: 6,
                border: "2px solid #1D2540",
                boxShadow: "0 2px 0 #1D2540",
              }}
            >
              <img
                src={result.image}
                alt={result.label}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            <strong style={{ color: "white", textAlign: "center" }}>
              {result.label}
            </strong>
          </div>
        ) : (
          <button
            onClick={spin}
            disabled={spinning}
            className="btn-factory btn-orange px-5 py-2"
          >
            {spinning ? "✨ Girando..." : "🎯 Girar"}
          </button>
        )}

        {result && (
          <button
            onClick={spin}
            disabled={spinning}
            className="mt-3 text-sm font-bold underline text-white"
          >
            sortear de novo
          </button>
        )}
      </div>
    </div>
  );
};
