import { CATEGORIES, CATEGORY_ORDER, type CategoryKey, type Item } from "@/data/catalog";
import bannerEscrita from "@/assets/telas/montehistoria.png";

export type StoryText = { inicio: string; meio: string; fim: string };

type Props = {
  results: Partial<Record<CategoryKey, Item>>;
  story: StoryText;
  onChange: (s: StoryText) => void;
  onBack: () => void;
  onRestart: () => void;
  onView: () => void;
};

const THEME: Record<CategoryKey, string> = {
  personagens: "var(--theme-personagens)",
  cenarios: "var(--theme-cenarios)",
  amigos: "var(--theme-amigos)",
  viloes: "var(--theme-viloes)",
  emocoes: "var(--theme-emocoes)",
};

const FIELD_LABEL: Record<keyof StoryText, { title: string; placeholder: string; color: string; emoji: string }> = {
  inicio: { title: "Começo", placeholder: "Era uma vez...",                  color: "var(--rosa)",        emoji: "✨" },
  meio:   { title: "Meio",   placeholder: "Então, de repente...",             color: "var(--azul-magico)", emoji: "🌀" },
  fim:    { title: "Final",  placeholder: "E foi assim que tudo terminou...", color: "var(--roxo-medio)",  emoji: "🎉" },
};

export const StoryScreen = ({ results, story, onChange, onBack, onRestart, onView }: Props) => {
  return (
    <div
      className="w-full h-full flex flex-col animate-fade-in no-print relative overflow-hidden"
      style={{
        backgroundImage: `url(${bannerEscrita})`,
        backgroundSize: "contain",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "hsl(var(--off-white))",
      }}
      role="img"
      aria-label="Monte sua história! Use os ingredientes que você sorteou"
    >
      {/* Espaçador do header ilustrado */}
      <div className="shrink-0" style={{ height: "30%" }} />

      {/* Conteúdo: sidebar de ingredientes + coluna de escrita */}
      <div className="flex-1 min-h-0 flex gap-4 px-6 pt-2 pb-2">
        {/* Sidebar estreita de ingredientes */}
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
                  className="flex flex-col items-center gap-0.5 rounded-lg p-1 animate-pop"
                  style={{
                    background: `hsl(${THEME[key]} / 0.18)`,
                    border: "2px solid hsl(var(--contorno))",
                    transform: `rotate(${idx % 2 === 0 ? -1.5 : 1.5}deg)`,
                  }}
                  title={`${CATEGORIES[key].title}: ${item.label}`}
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

        {/* Coluna de escrita VERTICAL: três blocos empilhados */}
        <div className="flex-1 min-w-0 flex flex-col gap-2.5 overflow-y-auto pr-1">
          {(Object.keys(FIELD_LABEL) as (keyof StoryText)[]).map((k, idx) => {
            const cfg = FIELD_LABEL[k];
            return (
              <div key={k} className="flex-1 min-h-0 flex flex-col">
                {/* Plaquinha cabeçalho */}
                <div
                  className="self-start inline-flex items-center gap-2 px-4 py-1.5 mb-1.5 font-display font-extrabold text-sm uppercase tracking-wider"
                  style={{
                    background: "hsl(var(--off-white))",
                    color: `hsl(${cfg.color})`,
                    border: "3px solid hsl(var(--contorno))",
                    borderRadius: 999,
                    boxShadow: "0 3px 0 hsl(var(--contorno))",
                    transform: `rotate(${idx === 1 ? 1.5 : -1.5}deg)`,
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs"
                    style={{
                      background: `hsl(${cfg.color})`,
                      color: "hsl(var(--off-white))",
                      border: "2px solid hsl(var(--contorno))",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span>{cfg.emoji} {cfg.title}</span>
                </div>

                {/* Campo de escrita grande */}
                <div
                  className="flex-1 min-h-0 rounded-2xl p-3"
                  style={{
                    background: "hsl(var(--off-white))",
                    backgroundImage:
                      "repeating-linear-gradient(0deg, hsl(var(--roxo-profundo) / .08) 0 1px, transparent 1px 32px)",
                    border: "4px solid hsl(var(--contorno))",
                    boxShadow: "0 5px 0 hsl(var(--contorno)), 0 12px 20px hsl(var(--contorno) / 0.18)",
                  }}
                >
                  <textarea
                    value={story[k]}
                    onChange={(e) => onChange({ ...story, [k]: e.target.value })}
                    placeholder={cfg.placeholder}
                    className="w-full h-full resize-none bg-transparent outline-none text-base font-medium leading-8"
                    style={{
                      color: "hsl(var(--contorno))",
                      fontFamily: "'Fredoka', sans-serif",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Painel inferior */}
      <div className="bg-painel flex justify-between items-center px-5 py-2.5 relative shrink-0">
        <button onClick={onBack} className="btn-purple text-base px-5 py-2">← Voltar</button>
        <button onClick={onRestart} className="btn-purple text-base px-5 py-2">↺ Reiniciar</button>
        <button onClick={onView} className="btn-purple text-base px-5 py-2">📖 Ver história</button>
      </div>
    </div>
  );
};
