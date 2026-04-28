import { CATEGORIES, CATEGORY_ORDER, type CategoryKey, type Item } from "@/data/catalog";
import { WheelCard } from "./WheelCard";

type Props = {
  results: Partial<Record<CategoryKey, Item>>;
  onResult: (key: CategoryKey, item: Item) => void;
  onWrite: () => void;
  onBack: () => void;
};

export const RouletteScreen = ({ results, onResult, onWrite, onBack }: Props) => {
  const allDone = CATEGORY_ORDER.every((k) => results[k]);
  const count = Object.keys(results).length;

  return (
    <div className="game-screen flex flex-col animate-fade-in relative overflow-hidden">

      {/* TÍTULO */}
      <div className="text-center pt-6 pb-2">
        <h1 className="game-title text-3xl font-extrabold">
          🎡 Gire as roletas!
        </h1>
        <p className="text-sm opacity-80">
          Descubra os ingredientes da sua história
        </p>
      </div>

      {/* ROLETAS */}
      <div className="grid grid-cols-5 gap-6 px-6 flex-1 items-center">

        {CATEGORY_ORDER.map((key) => (
          <div key={key} className="flex justify-center">
            <WheelCard
              category={CATEGORIES[key]}
              result={results[key] ?? null}
              onResult={(item) => onResult(key, item)}
            />
          </div>
        ))}

      </div>

      {/* RODAPÉ */}
      <div className="bottom-bar flex justify-between items-center">

        {/* VOLTAR */}
        <button
          onClick={onBack}
          className="btn-purple px-6 py-2"
        >
          ← Voltar
        </button>

        {/* CONTADOR */}
        <div className="font-bold text-yellow-300">
          {count} / 5 ingredientes
        </div>

        {/* ESCREVER */}
        <button
          onClick={onWrite}
          disabled={!allDone}
          className={`btn-pop px-6 py-2 ${allDone ? "animate-pulse" : "opacity-50 cursor-not-allowed"}`}
        >
          ✏️ Escrever história →
        </button>

      </div>

    </div>
  );
};
