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
  className="roulette-screen-bg h-screen overflow-hidden flex flex-col"
  style={{
    backgroundImage: `url(${bannerRoletas})`,
    backgroundSize: "contain",
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#ffffff",
  }}
>

      {/* ===== AREA DAS ROLETAS ===== */}
  <section className="bg-transparent grid grid-cols-5 gap-5 px-6 flex-1 items-start pt-[240px] relative z-10">
        {CATEGORY_ORDER.map((key) => (
          <div key={key} className="bg-transparent flex flex-col items-center h-full w-full">
            {/* título da categoria */}
            <div className="text-center font-extrabold text-[#5B22A8] mb-2 text-sm uppercase tracking-wide">
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
      <div className="flex justify-between items-center px-6 py-3 relative z-10">
        <button
          onClick={onBack}
          className="btn-game bg-[#5B22A8] text-white px-6 py-2"
        >
          ← Voltar
        </button>

        <div className="hud-counter text-sm">
          {count} / 5 ingredientes coletados
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
          ✏️ Escrever história →
        </button>
      </div>
    </div>
  );
};
