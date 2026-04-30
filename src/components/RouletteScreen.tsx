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
   <div className="min-h-screen flex flex-col bg-white">

      {/* ===== TOPO ===== */}
      <div className="text-center pt-6 pb-2">
        <h1 className="text-3xl font-extrabold text-[#5B22A8]">
          🎡 Gire as roletas!
        </h1>
        <p className="text-sm text-[#1D2540] opacity-70">
          Descubra os ingredientes da sua história
        </p>
      </div>

      {/* ===== AREA DAS ROLETA ===== */}
      <div className="grid grid-cols-5 gap-6 px-6 flex-1 items-center">

        {CATEGORY_ORDER.map((key) => (
          <div key={key} className="flex justify-center">
            <div
              className="rounded-2xl p-4 border-4 border-[#1D2540] shadow-[0_6px_0_#1D2540]"
              style={{
                background: getCardColor(key),
                width: 220,
              }}
            >
              {/* título */}
              <div className="text-center font-bold text-white mb-2 text-sm uppercase">
                {CATEGORIES[key].title}
              </div>

              {/* roleta */}
              <WheelCard
                category={CATEGORIES[key]}
                result={results[key] ?? null}
                onResult={(item) => onResult(key, item)}
              />
            </div>
          </div>
        ))}

      </div>

      {/* ===== RODAPÉ ===== */}
      <div className="flex justify-between items-center px-6 py-4">

        {/* VOLTAR */}
        <button
          onClick={onBack}
          className="bg-[#5B22A8] text-white px-6 py-2 rounded-full border-4 border-white shadow-[0_5px_0_#1D2540] font-bold"
        >
          ← Voltar
        </button>

        {/* CONTADOR */}
        <div className="font-bold text-[#1D2540]">
          {count} / 5 ingredientes
        </div>

        {/* ESCREVER */}
        <button
          onClick={onWrite}
          disabled={!allDone}
          className={`px-6 py-2 rounded-full border-4 border-white shadow-[0_5px_0_#1D2540] font-bold text-white ${
            allDone ? "bg-[#35C759]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          ✏️ Escrever história →
        </button>

      </div>
    </div>
  );
};

/* ===== CORES DOS CARDS ===== */
function getCardColor(key: CategoryKey) {
  switch (key) {
    case "personagens":
      return "#FF4F93";
    case "cenarios":
      return "#22B8E8";
    case "amigos":
      return "#7A35D8";
    case "viloes":
      return "#FF8A00";
    case "emocoes":
      return "#FFD23F";
    default:
      return "#999";
  }
}
