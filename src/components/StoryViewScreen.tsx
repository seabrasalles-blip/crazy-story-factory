import { createPortal } from "react-dom";
import { CATEGORIES, CATEGORY_ORDER, type CategoryKey, type Item } from "@/data/catalog";
import type { StoryText } from "./StoryScreen";
import bannerVeja from "@/assets/telas/vejahistoria.png";

type Props = {
  results: Partial<Record<CategoryKey, Item>>;
  story: StoryText;
  title: string;
  onTitleChange: (v: string) => void;
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

export const StoryViewScreen = ({ results, story, title, onTitleChange, onBack, onRestart }: Props) => {
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
      <div className="shrink-0" style={{ height: "30%" }} />

      {/* Conteúdo: sidebar de ingredientes + página de livro */}
      <div className="flex-1 min-h-0 px-8 pt-2 pb-2 flex gap-4">
        {/* Sidebar de ingredientes */}
        <aside
          className="shrink-0 flex flex-col gap-2 rounded-2xl p-2.5"
          style={{
            width: 130,
            background: "hsl(var(--off-white) / 0.92)",
            border: "3px solid hsl(var(--contorno))",
            boxShadow: "0 4px 0 hsl(var(--contorno))",
          }}
        >
          <div
            className="text-center font-display font-extrabold text-[10px] uppercase tracking-widest py-1 rounded-md"
            style={{
              background: "hsl(var(--amarelo))",
              color: "hsl(var(--contorno))",
              border: "2px solid hsl(var(--contorno))",
            }}
          >
            🎴 Ingredientes
          </div>
          <div className="flex-1 min-h-0 flex flex-col gap-1.5 overflow-y-auto">
            {CATEGORY_ORDER.map((key, idx) => {
              const item = results[key];
              if (!item) return null;
              return (
                <div
                  key={key}
                  className="flex flex-col items-center gap-0.5 rounded-lg p-1"
                  style={{
                    background: `hsl(${THEME[key]} / 0.18)`,
                    border: "2px solid hsl(var(--contorno))",
                    transform: `rotate(${idx % 2 === 0 ? -1.5 : 1.5}deg)`,
                  }}
                >
                  <img src={item.image} alt={item.label} className="w-10 h-10 object-contain" />
                  <div
                    className="font-display font-extrabold text-[10px] leading-tight text-center truncate w-full"
                    style={{ color: "hsl(var(--contorno))" }}
                  >
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Página de livro — texto contínuo */}
        <div
          className="flex-1 min-w-0 rounded-2xl px-10 py-6 overflow-y-auto relative"
          style={{
            background: "hsl(var(--off-white))",
            backgroundImage:
              "repeating-linear-gradient(0deg, hsl(var(--roxo-profundo) / .05) 0 1px, transparent 1px 34px)",
            border: "4px solid hsl(var(--contorno))",
            boxShadow:
              "inset 0 0 0 6px hsl(var(--off-white)), inset 0 0 0 8px hsl(var(--contorno) / 0.15), 0 6px 0 hsl(var(--contorno)), 0 14px 22px hsl(var(--contorno) / 0.25)",
          }}
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span
              className="font-display text-2xl select-none"
              style={{ color: "hsl(var(--rosa))" }}
              aria-hidden
            >
              ✦
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Digite o título da sua história..."
              aria-label="Título da história"
              className="flex-1 max-w-[80%] bg-transparent text-center font-display font-extrabold text-3xl md:text-4xl outline-none border-0 border-b-4 border-dashed pb-1 placeholder:font-display placeholder:font-bold placeholder:text-base placeholder:italic"
              style={{
                color: "hsl(var(--roxo-profundo))",
                borderColor: "hsl(var(--roxo-profundo) / 0.35)",
                letterSpacing: "0.5px",
              }}
            />
            <span
              className="font-display text-2xl select-none"
              style={{ color: "hsl(var(--rosa))" }}
              aria-hidden
            >
              ✦
            </span>
          </div>
          <div
            className="text-lg leading-8 whitespace-pre-wrap"
            style={{ fontFamily: "'Fredoka', sans-serif", color: "hsl(var(--contorno))", textIndent: "1.5rem" }}
          >
            {(["inicio", "meio", "fim"] as const)
              .map((k) => story[k]?.trim())
              .filter(Boolean)
              .join("\n\n") || (
              <span style={{ color: "hsl(var(--contorno) / 0.4)", fontStyle: "italic" }}>
                Sua história ainda está em branco. Volte para escrevê-la!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Painel inferior */}
      <div className="bg-painel flex justify-between items-center px-5 py-2.5 relative shrink-0">
        <button onClick={onBack} className="btn-purple text-base px-5 py-2">← Voltar para editar</button>
        <button onClick={onRestart} className="btn-purple text-base px-5 py-2">↺ Reiniciar</button>
        <button onClick={handlePrint} className="btn-purple text-base px-5 py-2">🖨 Imprimir história</button>
      </div>

      {/* Área de impressão */}
      <PrintArea results={results} story={story} title={title} />
    </div>
  );
};

const PrintArea = ({ results, story, title }: { results: Props["results"]; story: StoryText; title: string }) => {
  const node = (
    <div className="print-area">
      <h1 style={{ fontFamily: '"Baloo 2", cursive', fontSize: 32, color: "#4B1C8C", marginBottom: 4 }}>
        {title.trim() || "Minha história"}
      </h1>
      <h2 style={{ color: "#666", marginBottom: 20, fontWeight: 500, fontSize: 18 }}>
        Uma Fábrica de Histórias Malucas
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
