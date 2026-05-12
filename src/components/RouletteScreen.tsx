import { CATEGORIES, CATEGORY_ORDER, type CategoryKey, type Item } from "@/data/catalog";
import { WheelCard } from "./WheelCard";
import bannerRoletas from "@/assets/telas/telaroletas.png";

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
<div
  className="roulette-screen-bg min-h-screen overflow-y-auto flex flex-col"
style={{
  backgroundImage: `url(${bannerRoletas})`,
  backgroundSize: "100% auto",
  backgroundPosition: "top center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#ffffff",
}}
>

      {/* ===== AREA DAS ROLETAS ===== */}
 <section className="bg-transparent grid grid-cols-5 gap-5 px-6 pt-[210px] pb-4 relative z-10">
        {CATEGORY_ORDER.map((key) => (
          <div key={key} className="bg-transparent flex flex-col items-center h-full w-full">
            {/* título da categoria */}
    <div className="text-center font-extrabold text-black mb-3 text-lg uppercase tracking-wide bg-white/90 px-3 py-1 rounded-full shadow-md border-2 border-[#1D2540]">
  {CATEGORIES[key].title}
</div>

            {/* roleta sem card */}
            <div className="flex-1 w-full flex">
              <WheelCard
                category={CATEGORIES[key]}
                result={results[key] ?? null}
                onResult={(item) => onResult(key, item)}
              />
            </div>
          </div>
        ))}
      </section>

      {/* ===== RODAPÉ ===== */}
  <div className="flex justify-between items-center px-6 py-4 mt-auto relative z-10">
        <button
          onClick={onBack}
          className="btn-game bg-[#5B22A8] text-white px-6 py-2"
        >
          ← Voltar
        </button>

        <div className="hud-counter text-sm">
          {count} / 5 ingredientes
        </div>

        <button
          onClick={onWrite}
          disabled={!allDone}
          className={`btn-game px-6 py-2 text-white ${
            allDone
              ? "bg-[#35C759] animate-ready-pulse"
              : "bg-[#E5E7EB] !text-[#1D2540] opacity-90"
          }`}
        >
          Escrever história! →
        </button>
      </div>
    </div>
  );
};
