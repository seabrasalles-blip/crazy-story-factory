import { CATEGORIES, CATEGORY_ORDER, type CategoryKey, type Item } from "@/data/catalog";
import { WheelCard } from "./WheelCard";

const THEME_VARS: Record<CategoryKey, string> = {
  personagens: "var(--theme-personagens)",
  cenarios: "var(--theme-cenarios)",
  amigos: "var(--theme-amigos)",
  viloes: "var(--theme-viloes)",
  emocoes: "var(--theme-emocoes)",
};

type Props = {
  results: Partial<Record<CategoryKey, Item>>;
  onResult: (key: CategoryKey, item: Item) => void;
  onWrite: () => void;
  onBack: () => void;
};

// Pequenos enfeites decorativos (estrelas e engrenagens) ao fundo
const Decorations = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Estrelas piscantes */}
    {[
      { top: "6%", left: "4%", size: 18, delay: "0s", color: "var(--magenta)" },
      { top: "10%", left: "94%", size: 14, delay: ".4s", color: "var(--theme-cenarios)" },
      { top: "82%", left: "3%", size: 16, delay: ".8s", color: "var(--theme-emocoes)" },
      { top: "88%", left: "96%", size: 20, delay: "1.2s", color: "var(--theme-amigos)" },
      { top: "48%", left: "1.5%", size: 12, delay: "1.6s", color: "var(--theme-viloes)" },
      { top: "50%", left: "98%", size: 12, delay: "2s", color: "var(--magenta)" },
    ].map((s, i) => (
      <svg
        key={i}
        className="absolute animate-twinkle"
        style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay }}
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2l2.6 6.6L22 10l-5.5 4.7L18.4 22 12 18 5.6 22l1.9-7.3L2 10l7.4-1.4z"
          fill={`hsl(${s.color})`}
        />
      </svg>
    ))}
    {/* Engrenagens decorativas */}
    <svg className="absolute animate-spin-slow opacity-20" style={{ top: "-30px", right: "-30px", width: 140, height: 140 }} viewBox="0 0 100 100">
      <path fill="hsl(var(--primary))" d="M50 10l5 8 9-2 1 9 9 4-4 8 6 7-7 6 4 8-9 4-1 9-9-2-5 8-5-8-9 2-1-9-9-4 4-8-6-7 7-6-4-8 9-4 1-9 9 2z" />
      <circle cx="50" cy="50" r="14" fill="hsl(45 60% 98%)" />
    </svg>
    <svg className="absolute animate-spin-slower opacity-15" style={{ bottom: "-40px", left: "-40px", width: 180, height: 180 }} viewBox="0 0 100 100">
      <path fill="hsl(var(--magenta))" d="M50 10l5 8 9-2 1 9 9 4-4 8 6 7-7 6 4 8-9 4-1 9-9-2-5 8-5-8-9 2-1-9-9-4 4-8-6-7 7-6-4-8 9-4 1-9 9 2z" />
      <circle cx="50" cy="50" r="14" fill="hsl(45 60% 98%)" />
    </svg>
  </div>
);

export const RouletteScreen = ({ results, onResult, onWrite, onBack }: Props) => {
  const allDone = CATEGORY_ORDER.every((k) => results[k]);
  const count = Object.keys(results).length;

  return (
    <div className="w-full h-full bg-factory flex flex-col p-6 animate-fade-in relative">
      <Decorations />

      <div className="text-center mb-3 relative">
        <p className="font-display font-bold text-magenta tracking-widest text-sm">
          ✦ ROLETAS MALUCAS ✦
        </p>
        <h1 className="font-display font-extrabold text-primary text-4xl leading-tight text-shadow-pop">
          Gire as 5 roletas para fabricar a história!
        </h1>
        <div className="inline-flex items-center gap-2 mt-2 px-5 py-1.5 rounded-full border-2 border-dashed border-primary/40 bg-white/80 backdrop-blur">
          <span className="text-primary font-medium text-sm">
            ⚙️ Cada roleta é uma máquina mágica da fábrica! ⚙️
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 px-2 flex-1 items-center relative">
        {CATEGORY_ORDER.map((key) => (
          <WheelCard
            key={key}
            category={CATEGORIES[key]}
            themeColor={THEME_VARS[key]}
            result={results[key] ?? null}
            onResult={(item) => onResult(key, item)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 px-2 relative">
        <button onClick={onBack} className="btn-purple">← Voltar</button>
        <div className="px-4 py-1.5 rounded-full bg-white/80 border-2 border-primary/30 text-primary font-display font-bold text-sm">
          {count} de 5 roletas sorteadas
        </div>
        <button onClick={onWrite} disabled={!allDone} className="btn-pop">
          ✏️ Escrever história →
        </button>
      </div>
    </div>
  );
};
