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
  inicio: { title: "Começo", placeholder: "Era uma vez...",                   color: "var(--rosa)",        emoji: "✨" },
  meio:   { title: "Meio",   placeholder: "Então, de repente...",              color: "var(--azul-magico)", emoji: "🌀" },
  fim:    { title: "Final",  placeholder: "E foi assim que tudo terminou...",  color: "var(--roxo-medio)",  emoji: "🎉" },
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
      {/* Espaçador do header ilustrado (~32% da altura da imagem) */}
      <div className="shrink-0" style={{ height: "33%" }} />

      {/* Conteúdo dentro da área branca */}
      <div className="flex-1 min-h-0 flex flex-col gap-3 px-6 pt-3 pb-2">
        {/* Faixa horizontal de ingredientes (compacta) */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="px-2.5 py-1 rounded-full font-display font-extrabold text-[10px] uppercase tracking-widest shrink-0"
            style={{
              background: "hsl(var(--amarelo))",
              color: "hsl(var(--contorno))",
              border: "2px solid hsl(var(--contorno))",
              boxShadow: "0 2px 0 hsl(var(--contorno))",
            }}
          >
            🎴 Ingredientes
          </div>
          <div className="flex gap-1.5 flex-1 overflow-hidden">
            {CATEGORY_ORDER.map((key, idx) => {
              const item = results[key];
              if (!item) return null;
              return (
                <div
                  key={key}
                  className="flex items-center gap-1.5 rounded-lg px-1.5 py-0.5 animate-pop min-w-0 flex-1"
                  style={{
                    background: "hsl(var(--off-white))",
                    border: "2px solid hsl(var(--contorno))",
                    boxShadow: "0 2px 0 hsl(var(--contorno))",
                    transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`,
                  }}
                  title={`${CATEGORIES[key].title}: ${item.label}`}
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
                  <div className="font-display font-extrabold text-[11px] truncate min-w-0" style={{ color: "hsl(var(--contorno))" }}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Três campos GRANDES ocupando o restante */}
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
          {(Object.keys(FIELD_LABEL) as (keyof StoryText)[]).map((k, idx) => {
            const cfg = FIELD_LABEL[k];
            return (
              <div
                key={k}
                className="relative rounded-2xl p-4 pt-7 flex flex-col min-h-0"
                style={{
                  background: "hsl(var(--off-white))",
                  backgroundImage:
                    "repeating-linear-gradient(0deg, hsl(var(--roxo-profundo) / .08) 0 1px, transparent 1px 28px)",
                  border: "4px solid hsl(var(--contorno))",
                  boxShadow: "0 6px 0 hsl(var(--contorno)), 0 14px 22px hsl(var(--contorno) / 0.25)",
                  transform: `rotate(${idx === 1 ? 0.4 : -0.3}deg)`,
                }}
              >
                <div
                  className="absolute -top-3.5 left-4 px-4 py-1 font-display font-extrabold text-sm uppercase tracking-wide"
                  style={{
                    background: `hsl(${cfg.color})`,
                    color: "hsl(var(--off-white))",
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
      <div className="bg-painel flex justify-between items-center px-5 py-2.5 relative shrink-0">
        <button onClick={onBack} className="btn-purple text-base px-5 py-2">← Voltar</button>
        <button onClick={onRestart} className="btn-yellow text-base px-5 py-2">↺ Reiniciar</button>
        <button onClick={onView} className="btn-magenta text-base px-5 py-2">📖 Ver história</button>
      </div>
    </div>
  );
};
