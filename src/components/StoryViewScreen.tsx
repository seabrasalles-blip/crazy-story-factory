import { createPortal } from "react-dom";
import { CATEGORIES, CATEGORY_ORDER, type CategoryKey, type Item } from "@/data/catalog";
import type { StoryText } from "./StoryScreen";
import bannerVeja from "@/assets/telas/vejahistoria.png";

type Props = {
  results: Partial<Record<CategoryKey, Item>>;
  story: StoryText;
  onBack: () => void;
  onRestart: () => void;
};

const FIELD_TITLE: Record<keyof StoryText, { title: string; color: string; emoji: string }> = {
  inicio: { title: "Começo", color: "var(--rosa)",        emoji: "✨" },
  meio:   { title: "Meio",   color: "var(--azul-magico)", emoji: "🌀" },
  fim:    { title: "Final",  color: "var(--roxo-medio)",  emoji: "🎉" },
};

const THEME: Record<CategoryKey, string> = {
  personagens: "var(--theme-personagens)",
  cenarios: "var(--theme-cenarios)",
  amigos: "var(--theme-amigos)",
  viloes: "var(--theme-viloes)",
  emocoes: "var(--theme-emocoes)",
};

export const StoryViewScreen = ({ results, story, onBack, onRestart }: Props) => {
  const handlePrint = () => window.print();

  return (
    <div
      className="w-full h-full flex flex-col animate-fade-in no-print relative overflow-hidden"
      style={{
        backgroundImage: `url(${bannerVeja})`,
        backgroundSize: "contain",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "hsl(var(--off-white))",
      }}
      role="img"
      aria-label="Veja sua história"
    >
      {/* Espaçador do header ilustrado */}
      <div className="shrink-0" style={{ height: "33%" }} />

      {/* Conteúdo: ingredientes + história */}
      <div className="flex-1 min-h-0 px-10 pt-4 pb-2 flex flex-col gap-3">
        {/* Faixa de ingredientes */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="px-3 py-1 rounded-full font-display font-extrabold text-[11px] uppercase tracking-widest"
            style={{
              background: "hsl(var(--amarelo))",
              color: "hsl(var(--contorno))",
              border: "2.5px solid hsl(var(--contorno))",
              boxShadow: "0 3px 0 hsl(var(--contorno))",
            }}
          >
            🎴 Ingredientes
          </div>
          <div className="flex gap-2 flex-1 overflow-hidden">
            {CATEGORY_ORDER.map((key, idx) => {
              const item = results[key];
              if (!item) return null;
              return (
                <div
                  key={key}
                  className="flex items-center gap-1.5 rounded-xl p-1 pr-2"
                  style={{
                    background: "hsl(var(--off-white))",
                    border: "2.5px solid hsl(var(--contorno))",
                    boxShadow: "0 2px 0 hsl(var(--contorno))",
                    transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`,
                  }}
                >
                  <div
                    className="rounded-md p-0.5 shrink-0"
                    style={{
                      background: `hsl(${THEME[key]} / 0.25)`,
                      border: "1.5px solid hsl(var(--contorno))",
                    }}
                  >
                    <img src={item.image} alt={item.label} className="w-7 h-7 object-contain" />
                  </div>
                  <div className="font-display font-extrabold text-xs leading-tight" style={{ color: "hsl(var(--contorno))" }}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cartão da história */}
        <div
          className="flex-1 min-h-0 rounded-2xl p-5 overflow-y-auto"
          style={{
            background: "hsl(var(--off-white))",
            backgroundImage:
              "repeating-linear-gradient(0deg, hsl(var(--roxo-profundo) / .08) 0 1px, transparent 1px 28px)",
            border: "4px solid hsl(var(--contorno))",
            boxShadow: "0 6px 0 hsl(var(--contorno)), 0 14px 22px hsl(var(--contorno) / 0.25)",
          }}
        >
          <div className="flex flex-col gap-3" style={{ fontFamily: "'Fredoka', sans-serif", color: "hsl(var(--contorno))" }}>
            {(Object.keys(FIELD_TITLE) as (keyof StoryText)[]).map((k) => {
              const cfg = FIELD_TITLE[k];
              const text = story[k]?.trim();
              return (
                <section key={k}>
                  <div
                    className="inline-block px-3 py-0.5 mb-1 rounded-full font-display font-extrabold text-xs uppercase tracking-wide"
                    style={{
                      background: `hsl(${cfg.color})`,
                      color: "hsl(var(--off-white))",
                      border: "2.5px solid hsl(var(--contorno))",
                      boxShadow: "0 2px 0 hsl(var(--contorno))",
                    }}
                  >
                    {cfg.emoji} {cfg.title}
                  </div>
                  <p
                    className="text-base leading-7 whitespace-pre-wrap"
                    style={{ color: text ? "hsl(var(--contorno))" : "hsl(var(--contorno) / 0.4)" }}
                  >
                    {text || "(em branco)"}
                  </p>
                </section>
              );
            })}
          </div>
        </div>
      </div>

      {/* Painel inferior */}
      <div className="bg-painel flex justify-between items-center px-5 py-2.5 relative shrink-0">
        <button onClick={onBack} className="btn-purple text-base px-5 py-2">← Voltar para editar</button>
        <button onClick={onRestart} className="btn-yellow text-base px-5 py-2">↺ Reiniciar</button>
        <button onClick={handlePrint} className="btn-magenta text-base px-5 py-2">🖨 Imprimir história</button>
      </div>

      {/* Área de impressão */}
      <PrintArea results={results} story={story} />
    </div>
  );
};

const PrintArea = ({ results, story }: { results: Props["results"]; story: StoryText }) => {
  const node = (
    <div className="print-area">
      <h1 style={{ fontFamily: '"Baloo 2", cursive', fontSize: 32, color: "#4B1C8C", marginBottom: 4 }}>
        Uma Fábrica de Histórias Malucas!
      </h1>
      <h2 style={{ color: "#666", marginBottom: 20, fontWeight: 500, fontSize: 18 }}>
        Minha história fabricada
      </h2>

      <h3 style={{ color: "#4B1C8C", marginBottom: 10, fontSize: 18 }}>Elementos sorteados</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
        {CATEGORY_ORDER.map((k) => {
          const it = results[k];
          if (!it) return null;
          return (
            <div key={k} style={{ border: "2px solid #1D2540", borderRadius: 12, padding: 8, textAlign: "center" }}>
              <img src={it.image} alt={it.label} style={{ width: 70, height: 70, objectFit: "contain", margin: "0 auto" }} />
              <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{CATEGORIES[k].title}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1D2540" }}>{it.label}</div>
            </div>
          );
        })}
      </div>

      {(["inicio", "meio", "fim"] as const).map((k) => (
        <div key={k} style={{ marginBottom: 16, pageBreakInside: "avoid" }}>
          <h3 style={{ color: "#4B1C8C", marginBottom: 6, fontSize: 18 }}>{FIELD_TITLE[k].title}</h3>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, fontSize: 14, color: "#222", borderBottom: "1px solid #eee", paddingBottom: 8, minHeight: 40 }}>
            {story[k] || "—"}
          </p>
        </div>
      ))}
    </div>
  );
  return createPortal(node, document.body);
};
