import { createPortal } from "react-dom";
import { CATEGORIES, CATEGORY_ORDER, type CategoryKey, type Item } from "@/data/catalog";

export type StoryText = { inicio: string; meio: string; fim: string };

type Props = {
  results: Partial<Record<CategoryKey, Item>>;
  story: StoryText;
  onChange: (s: StoryText) => void;
  onBack: () => void;
  onRestart: () => void;
};

const THEME: Record<CategoryKey, string> = {
  personagens: "var(--theme-personagens)",
  cenarios: "var(--theme-cenarios)",
  amigos: "var(--theme-amigos)",
  viloes: "var(--theme-viloes)",
  emocoes: "var(--theme-emocoes)",
};

const FIELD_LABEL: Record<keyof StoryText, { title: string; placeholder: string; color: string; emoji: string }> = {
  inicio: { title: "Começo", placeholder: "Era uma vez...", color: "var(--magenta)", emoji: "🌟" },
  meio:   { title: "Meio",   placeholder: "Então, de repente...", color: "var(--theme-cenarios)", emoji: "✨" },
  fim:    { title: "Final",  placeholder: "E foi assim que tudo terminou...", color: "var(--success)", emoji: "🏁" },
};

export const StoryScreen = ({ results, story, onChange, onBack, onRestart }: Props) => {
  const handlePrint = () => window.print();

  return (
    <div className="w-full h-full bg-factory flex flex-col p-6 animate-fade-in no-print relative overflow-hidden">
      {/* Estrelas decorativas */}
      <svg className="absolute animate-twinkle" style={{ top: 12, right: 24, width: 18, height: 18 }} viewBox="0 0 24 24">
        <path d="M12 2l2.6 6.6L22 10l-5.5 4.7L18.4 22 12 18 5.6 22l1.9-7.3L2 10l7.4-1.4z" fill="hsl(var(--magenta))" />
      </svg>
      <svg className="absolute animate-twinkle" style={{ bottom: 70, left: 18, width: 14, height: 14, animationDelay: ".6s" }} viewBox="0 0 24 24">
        <path d="M12 2l2.6 6.6L22 10l-5.5 4.7L18.4 22 12 18 5.6 22l1.9-7.3L2 10l7.4-1.4z" fill="hsl(var(--theme-cenarios))" />
      </svg>

      <div className="mb-3 relative">
        <p className="font-display font-bold text-magenta tracking-widest text-sm">
          ✦ AGORA É A SUA VEZ ✦
        </p>
        <h1 className="font-display font-extrabold text-primary text-3xl leading-tight text-shadow-pop">
          Escreva a sua história com os elementos sorteados!
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0 relative">
        {/* Coluna esquerda: cartões sorteados */}
        <div className="col-span-4 flex flex-col gap-2 overflow-y-auto pr-1">
          <div className="px-3 py-1 rounded-full bg-primary text-white font-display font-bold text-sm text-center mb-1 self-start">
            🎴 Seus elementos
          </div>
          {CATEGORY_ORDER.map((key) => {
            const item = results[key];
            if (!item) return null;
            return (
              <div
                key={key}
                className="flex items-center gap-3 bg-white rounded-2xl p-2 animate-pop"
                style={{
                  border: `3px solid hsl(${THEME[key]})`,
                  boxShadow: `0 4px 0 hsl(${THEME[key]} / 0.5)`,
                }}
              >
                <div
                  className="rounded-xl p-1 shrink-0"
                  style={{ background: `hsl(${THEME[key]} / 0.15)` }}
                >
                  <img src={item.image} alt={item.label} className="w-14 h-14 object-contain" />
                </div>
                <div className="leading-tight">
                  <div
                    className="inline-block px-2 py-0.5 rounded-full text-white font-display font-bold text-[11px] uppercase tracking-wide mb-0.5"
                    style={{ background: `hsl(${THEME[key]})` }}
                  >
                    {CATEGORIES[key].title}
                  </div>
                  <div className="text-primary font-extrabold text-base">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centro: três cartões mágicos */}
        <div className="col-span-8 flex flex-col gap-3">
          {(Object.keys(FIELD_LABEL) as (keyof StoryText)[]).map((k) => {
            const cfg = FIELD_LABEL[k];
            return (
              <div
                key={k}
                className="relative bg-white rounded-2xl p-3 pt-5 flex-1 flex flex-col"
                style={{
                  border: `4px solid hsl(${cfg.color})`,
                  boxShadow: `0 6px 0 hsl(${cfg.color} / 0.45), 0 12px 22px hsl(${cfg.color} / 0.18)`,
                  background: `linear-gradient(180deg, white 0%, hsl(${cfg.color} / 0.06) 100%)`,
                }}
              >
                {/* Etiqueta colorida no topo */}
                <div
                  className="absolute -top-3 left-4 px-4 py-1 rounded-full text-white font-display font-extrabold text-sm uppercase tracking-wide"
                  style={{
                    background: `linear-gradient(180deg, hsl(${cfg.color}) 0%, hsl(${cfg.color} / 0.8) 100%)`,
                    border: "2px solid white",
                    boxShadow: `0 3px 0 hsl(${cfg.color} / 0.55)`,
                  }}
                >
                  {cfg.emoji} {cfg.title}
                </div>
                <textarea
                  value={story[k]}
                  onChange={(e) => onChange({ ...story, [k]: e.target.value })}
                  placeholder={cfg.placeholder}
                  className="w-full flex-1 resize-none bg-transparent outline-none text-primary placeholder:text-primary/35 text-base font-medium"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 relative">
        <button onClick={onBack} className="btn-purple">← Voltar</button>
        <button onClick={onRestart} className="btn-yellow">↺ Reiniciar</button>
        <button onClick={handlePrint} className="btn-magenta">🖨 Imprimir história</button>
      </div>

      {/* Área de impressão (oculta na tela) */}
      <PrintArea results={results} story={story} />
    </div>
  );
};

const PrintArea = ({ results, story }: { results: Props["results"]; story: StoryText }) => {
  const node = (
    <div className="print-area">
      <h1 style={{ fontFamily: '"Baloo 2", cursive', fontSize: 32, color: "#3b1d6b", marginBottom: 4 }}>
        Uma Fábrica de Histórias Malucas!
      </h1>
      <h2 style={{ color: "#666", marginBottom: 20, fontWeight: 500, fontSize: 18 }}>
        Minha história fabricada
      </h2>

      <h3 style={{ color: "#3b1d6b", marginBottom: 10, fontSize: 18 }}>Elementos sorteados</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {CATEGORY_ORDER.map((k) => {
          const it = results[k];
          if (!it) return null;
          return (
            <div
              key={k}
              style={{
                border: "2px solid #d6cce8",
                borderRadius: 12,
                padding: 8,
                textAlign: "center",
              }}
            >
              <img
                src={it.image}
                alt={it.label}
                style={{ width: 70, height: 70, objectFit: "contain", margin: "0 auto" }}
              />
              <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                {CATEGORIES[k].title}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#3b1d6b" }}>
                {it.label}
              </div>
            </div>
          );
        })}
      </div>

      {(["inicio", "meio", "fim"] as const).map((k) => (
        <div key={k} style={{ marginBottom: 16, pageBreakInside: "avoid" }}>
          <h3 style={{ color: "#3b1d6b", marginBottom: 6, fontSize: 18 }}>
            {FIELD_LABEL[k].title}
          </h3>
          <p
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
              fontSize: 14,
              color: "#222",
              borderBottom: "1px solid #eee",
              paddingBottom: 8,
              minHeight: 40,
            }}
          >
            {story[k] || "—"}
          </p>
        </div>
      ))}
    </div>
  );
  return createPortal(node, document.body);
};

