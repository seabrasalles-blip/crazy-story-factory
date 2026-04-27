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

export const RouletteScreen = ({ results, onResult, onWrite, onBack }: Props) => {
  const allDone = CATEGORY_ORDER.every((k) => results[k]);

  return (
    <div className="w-full h-full bg-cream flex flex-col p-6 animate-fade-in">
      <div className="text-center mb-3">
        <p className="font-display font-bold text-magenta tracking-widest text-sm">
          ROLETAS MALUCAS
        </p>
        <h1 className="font-display font-extrabold text-primary text-4xl leading-tight">
          Gire as 5 roletas para fabricar a história.
        </h1>
        <div className="inline-block mt-2 px-5 py-1.5 rounded-full border-2 border-dashed border-primary/40 bg-white">
          <span className="text-primary font-medium text-sm">
            ✦ Cada roleta sorteará um elemento da sua história! ✦
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 px-2 flex-1 items-center">
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

      <div className="flex justify-between items-center mt-4 px-2">
        <button onClick={onBack} className="btn-purple">← Voltar</button>
        <div className="text-primary/70 font-medium text-sm">
          {Object.keys(results).length} de 5 roletas sorteadas
        </div>
        <button onClick={onWrite} disabled={!allDone} className="btn-pop">
          ✏️ Escrever história →
        </button>
      </div>
    </div>
  );
};
