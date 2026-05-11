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
      <div className="shrink-0" style={{ height: "22%" }} />

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
 <div className="ingredients-title">
  ✨ Ingredientes
</div>

<div className="flex-1 min-h-0 flex flex-col items-center gap-4 pt-2">
  {CATEGORY_ORDER.map((key) => {
    const item = results[key];
    if (!item) return null;

    return (
      <div
        key={key}
        className="ingredient-card animate-pop"
        title={`${CATEGORIES[key].title}: ${item.label}`}
      >
        <img
          src={item.image}
          alt={item.label}
        />

        <span>
          {item.label}
        </span>
      </div>
    );
  })}
</div>

        {/* Coluna de escrita VERTICAL: três blocos empilhados */}
       <div className="flex-1 min-w-0 flex flex-col gap-4 pr-1 pt-2">
          {(Object.keys(FIELD_LABEL) as (keyof StoryText)[]).map((k, idx) => {
            const cfg = FIELD_LABEL[k];
            const tagClass = idx === 0 ? "" : idx === 1 ? "story-tag-middle" : "story-tag-final";
            return (
              <div key={k} className="story-block flex-1 min-h-0 flex flex-col">
                <div className={`story-tag ${tagClass}`}>
                  <span className="story-tag-icon">{cfg.emoji}</span>
                  <span>{cfg.title}</span>
                </div>
                <textarea
                  value={story[k]}
                  onChange={(e) => onChange({ ...story, [k]: e.target.value })}
                  placeholder={cfg.placeholder}
                  className="story-writing-box flex-1"
                />
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
