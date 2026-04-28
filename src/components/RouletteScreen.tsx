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

// Tubulação superior — atravessa toda a largura conectando as 5 máquinas
const TopPipeline = () => (
  <div className="absolute top-12 left-0 right-0 h-10 pointer-events-none z-0">
    <div
      className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-7 rounded-full"
      style={{
        background: "linear-gradient(180deg, hsl(var(--amarelo)) 0%, hsl(var(--laranja)) 100%)",
        border: "3px solid hsl(var(--contorno))",
        boxShadow: "0 4px 0 hsl(var(--contorno))",
      }}
    />
    {/* Faixas/anéis na tubulação */}
    {[15, 30, 45, 60, 75, 90].map((pct) => (
      <div
        key={pct}
        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-9 rounded-sm"
        style={{ left: `${pct}%`, background: "hsl(var(--contorno))" }}
      />
    ))}
  </div>
);

const Decorations = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Estrelas piscantes */}
    {[
      { top: "8%", left: "4%",  size: 18, delay: "0s",   color: "var(--amarelo)" },
      { top: "20%", left: "94%", size: 14, delay: ".4s", color: "var(--rosa)" },
      { top: "84%", left: "3%",  size: 16, delay: ".8s", color: "var(--azul-magico)" },
      { top: "88%", left: "96%", size: 20, delay: "1.2s", color: "var(--amarelo)" },
      { top: "55%", left: "1.5%", size: 12, delay: "1.6s", color: "var(--rosa)" },
      { top: "60%", left: "98%", size: 12, delay: "2s",   color: "var(--off-white)" },
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
          stroke="hsl(var(--contorno))"
          strokeWidth="1"
        />
      </svg>
    ))}
    {/* Engrenagens gigantes nos cantos */}
    <svg className="absolute animate-spin-slow opacity-15" style={{ top: -50, right: -50, width: 200, height: 200 }} viewBox="0 0 100 100">
      <path fill="hsl(var(--amarelo))" d="M50 10l5 8 9-2 1 9 9 4-4 8 6 7-7 6 4 8-9 4-1 9-9-2-5 8-5-8-9 2-1-9-9-4 4-8-6-7 7-6-4-8 9-4 1-9 9 2z" />
      <circle cx="50" cy="50" r="14" fill="hsl(var(--off-white))" />
    </svg>
    <svg className="absolute animate-spin-slower opacity-15" style={{ bottom: -60, left: -60, width: 240, height: 240 }} viewBox="0 0 100 100">
      <path fill="hsl(var(--rosa))" d="M50 10l5 8 9-2 1 9 9 4-4 8 6 7-7 6 4 8-9 4-1 9-9-2-5 8-5-8-9 2-1-9-9-4 4-8-6-7 7-6-4-8 9-4 1-9 9 2z" />
      <circle cx="50" cy="50" r="14" fill="hsl(var(--off-white))" />
    </svg>
  </div>
);

export const RouletteScreen = ({ results, onResult, onWrite, onBack }: Props) => {
  const allDone = CATEGORY_ORDER.every((k) => results[k]);
  const count = Object.keys(results).length;

  return (
    <div className="w-full h-full bg-fabrica flex flex-col animate-fade-in relative overflow-hidden">
      <Decorations />

      {/* Cabeçalho — placa de neon */}
      <div className="text-center pt-3 pb-1 relative z-10">
        <div
          className="inline-flex flex-col items-center px-7 py-1.5 rounded-2xl"
          style={{
            background: "hsl(var(--roxo-profundo))",
            border: "3px solid hsl(var(--amarelo))",
            boxShadow: "0 0 0 3px hsl(var(--contorno)), 0 0 24px hsl(var(--amarelo) / 0.6)",
            transform: "rotate(-1deg)",
          }}
        >
          <p className="font-display font-bold tracking-[0.3em] text-xs" style={{ color: "hsl(var(--amarelo))" }}>
            ⚙ FÁBRICA DE HISTÓRIAS ⚙
          </p>
          <h1 className="font-display font-extrabold text-2xl leading-tight" style={{ color: "hsl(var(--off-white))" }}>
            Roletas Malucas
          </h1>
        </div>
      </div>

      {/* Tubulação superior */}
      <TopPipeline />

      {/* Linha das 5 máquinas */}
      <div className="grid grid-cols-5 gap-2 px-4 flex-1 items-center relative z-10 pt-8">
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

      {/* Painel de controle inferior */}
      <div className="bg-painel flex justify-between items-center px-5 py-3 relative z-10">
        <button onClick={onBack} className="btn-purple text-base px-5 py-2">← Voltar</button>

        {/* Display digital */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg font-display font-extrabold text-base"
          style={{
            background: "hsl(var(--contorno))",
            border: "2.5px solid hsl(var(--amarelo))",
            color: "hsl(var(--amarelo))",
            boxShadow: "inset 0 0 12px hsl(var(--amarelo) / 0.3)",
            fontFamily: '"Baloo 2", monospace',
            letterSpacing: "0.1em",
          }}
        >
          <span className="animate-led">●</span>
          {count} / 5 INGREDIENTES
        </div>

        <button onClick={onWrite} disabled={!allDone} className={`btn-pop text-base px-6 py-2.5 ${allDone ? "animate-pulse-soft" : ""}`}>
          ✏️ Escrever história →
        </button>
      </div>
    </div>
  );
};
