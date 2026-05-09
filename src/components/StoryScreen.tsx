import { createPortal } from "react-dom";
import { CATEGORIES, CATEGORY_ORDER, type CategoryKey, type Item } from "@/data/catalog";
import bannerEscrita from "@/assets/telas/telaescrita.png";

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
  inicio: { title: "Começo", placeholder: "Era uma vez...",                color: "var(--amarelo)", emoji: "✨" },
  meio:   { title: "Meio",   placeholder: "Então, de repente...",          color: "var(--rosa)",    emoji: "🌀" },
  fim:    { title: "Final",  placeholder: "E foi assim que tudo terminou...", color: "var(--verde)",   emoji: "🎉" },
};

// Moldura decorativa de tubulação na borda superior
const PipeFrame = () => (
  <>
    <div
      className="absolute top-0 left-0 right-0 h-3 pointer-events-none"
      style={{
        background: "linear-gradient(90deg, hsl(var(--rosa)) 0%, hsl(var(--amarelo)) 50%, hsl(var(--azul-magico)) 100%)",
        borderBottom: "3px solid hsl(var(--contorno))",
      }}
    />
    <div
      className="absolute bottom-0 left-0 right-0 h-3 pointer-events-none"
      style={{
        background: "linear-gradient(90deg, hsl(var(--azul-magico)) 0%, hsl(var(--amarelo)) 50%, hsl(var(--rosa)) 100%)",
        borderTop: "3px solid hsl(var(--contorno))",
      }}
    />
  </>
);

export const StoryScreen = ({ results, story, onChange, onBack, onRestart }: Props) => {
  const handlePrint = () => window.print();

  return (
    <div className="w-full h-full bg-atelie flex flex-col animate-fade-in no-print relative overflow-hidden">
      <PipeFrame />

      {/* Estrelas decorativas */}
      <svg className="absolute animate-twinkle" style={{ top: 22, right: 30, width: 16, height: 16 }} viewBox="0 0 24 24">
        <path d="M12 2l2.6 6.6L22 10l-5.5 4.7L18.4 22 12 18 5.6 22l1.9-7.3L2 10l7.4-1.4z" fill="hsl(var(--rosa))" stroke="hsl(var(--contorno))" strokeWidth="1" />
      </svg>
      <svg className="absolute animate-twinkle" style={{ bottom: 80, left: 24, width: 14, height: 14, animationDelay: ".6s" }} viewBox="0 0 24 24">
        <path d="M12 2l2.6 6.6L22 10l-5.5 4.7L18.4 22 12 18 5.6 22l1.9-7.3L2 10l7.4-1.4z" fill="hsl(var(--azul-magico))" stroke="hsl(var(--contorno))" strokeWidth="1" />
      </svg>

      <div
        className="w-full relative z-10"
        style={{
          backgroundImage: `url(${bannerEscrita})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          height: "clamp(110px, 18vh, 180px)",
        }}
        role="img"
        aria-label="Monte sua história! Use os ingredientes que você sorteou"
      />

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0 px-6 pb-3 relative">
        {/* Sidebar — ingredientes */}
        <div
          className="col-span-4 rounded-3xl p-3 flex flex-col gap-2 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(var(--roxo-profundo)) 0%, hsl(var(--roxo-medio)) 100%)",
            border: "4px solid hsl(var(--contorno))",
            boxShadow: "0 6px 0 hsl(var(--contorno)), 0 16px 26px hsl(var(--contorno) / 0.35)",
          }}
        >
          <div
            className="px-3 py-1.5 rounded-full text-center font-display font-extrabold text-xs uppercase tracking-widest self-center mb-1"
            style={{
              background: "hsl(var(--amarelo))",
              color: "hsl(var(--contorno))",
              border: "2.5px solid hsl(var(--contorno))",
              boxShadow: "0 3px 0 hsl(var(--contorno))",
            }}
          >
            🎴 Ingredientes
          </div>

          <div className="flex flex-col gap-2 overflow-y-auto pr-1">
            {CATEGORY_ORDER.map((key, idx) => {
              const item = results[key];
              if (!item) return null;
              return (
                <div
                  key={key}
                  className="flex items-center gap-2.5 rounded-2xl p-2 animate-pop"
                  style={{
                    background: "hsl(var(--off-white))",
                    border: "3px solid hsl(var(--contorno))",
                    boxShadow: "0 3px 0 hsl(var(--contorno))",
                    transform: `rotate(${idx % 2 === 0 ? -1.5 : 1.5}deg)`,
                  }}
                >
                  <div
                    className="rounded-xl p-1 shrink-0"
                    style={{
                      background: `hsl(${THEME[key]} / 0.25)`,
                      border: "2px solid hsl(var(--contorno))",
                    }}
                  >
                    <img src={item.image} alt={item.label} className="w-12 h-12 object-contain" />
                  </div>
                  <div className="leading-tight">
                    <div
                      className="inline-block px-2 py-0.5 rounded-full font-display font-extrabold text-[10px] uppercase tracking-wide mb-0.5"
                      style={{
                        background: `hsl(${THEME[key]})`,
                        color: "hsl(var(--contorno))",
                        border: "1.5px solid hsl(var(--contorno))",
                      }}
                    >
                      {CATEGORIES[key].title}
                    </div>
                    <div className="font-display font-extrabold text-sm" style={{ color: "hsl(var(--contorno))" }}>
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centro — três cartões "página de caderno" */}
        <div className="col-span-8 flex flex-col gap-4">
          {(Object.keys(FIELD_LABEL) as (keyof StoryText)[]).map((k, idx) => {
            const cfg = FIELD_LABEL[k];
            return (
              <div
                key={k}
                className="relative rounded-2xl p-3 pt-5 flex-1 flex flex-col"
                style={{
                  background: "hsl(var(--off-white))",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, hsl(var(--roxo-profundo) / .08) 0 1px, transparent 1px 26px)",
                  border: "4px solid hsl(var(--contorno))",
                  borderRadius: 22,
                  boxShadow: "0 6px 0 hsl(var(--contorno)), 0 14px 22px hsl(var(--contorno) / 0.25)",
                  transform: `rotate(${idx === 1 ? 0.4 : -0.3}deg)`,
                }}
              >
                {/* Etiqueta sticker flutuante */}
                <div
                  className="absolute -top-3.5 left-5 px-4 py-1 font-display font-extrabold text-sm uppercase tracking-wide"
                  style={{
                    background: `hsl(${cfg.color})`,
                    color: "hsl(var(--contorno))",
                    border: "3px solid hsl(var(--contorno))",
                    borderRadius: 999,
                    boxShadow: "0 3px 0 hsl(var(--contorno))",
                    transform: "rotate(-2deg)",
                  }}
                >
                  {cfg.emoji} {cfg.title}
                </div>

                <textarea
                  value={story[k]}
                  onChange={(e) => onChange({ ...story, [k]: e.target.value })}
                  placeholder={cfg.placeholder}
                  className="w-full flex-1 resize-none bg-transparent outline-none text-base font-medium leading-7"
                  style={{
                    color: "hsl(var(--contorno))",
                    fontFamily: "'Fredoka', sans-serif",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Painel inferior */}
      <div className="bg-painel flex justify-between items-center px-5 py-3 relative">
        <button onClick={onBack} className="btn-purple text-base px-5 py-2">← Voltar</button>
        <button onClick={onRestart} className="btn-yellow text-base px-5 py-2">↺ Reiniciar</button>
        <button onClick={handlePrint} className="btn-magenta text-base px-5 py-2">🖨 Imprimir história</button>
      </div>

      {/* Área de impressão (oculta na tela, renderizada no body via portal) */}
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
                border: "2px solid #1D2540",
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
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1D2540" }}>
                {it.label}
              </div>
            </div>
          );
        })}
      </div>

      {(["inicio", "meio", "fim"] as const).map((k) => (
        <div key={k} style={{ marginBottom: 16, pageBreakInside: "avoid" }}>
          <h3 style={{ color: "#4B1C8C", marginBottom: 6, fontSize: 18 }}>
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
