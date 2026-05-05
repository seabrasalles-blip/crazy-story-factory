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
    <div className="roulette-screen-bg h-screen overflow-hidden flex flex-col">
      {/* ===== TOPO ===== */}
      <div className="text-center pt-4 pb-1 relative z-10">
        <h1 className="text-3xl font-extrabold text-[#5B22A8]">
          🎡 Gire as roletas!
        </h1>
        <p className="text-sm text-[#1D2540] opacity-70">
          Descubra os ingredientes da sua história
        </p>
      </div>

      {/* ===== AREA DAS ROLETAS ===== */}
      <div className="grid grid-cols-5 gap-5 px-6 flex-1 items-stretch py-3 relative z-10">
        {CATEGORY_ORDER.map((key) => (
          <div key={key} className="flex justify-center">
            <div
              className="wheel-card-hover rounded-2xl p-4 border-4 border-[#1D2540] flex flex-col h-full w-full"
              style={{
                background: getCardColor(key),
                maxWidth: 220,
              }}
            >
              {/* título */}
              <div className="text-center font-bold text-white mb-2 text-sm uppercase">
                {CATEGORIES[key].title}
              </div>

              {/* roleta */}
              <div className="flex-1 flex">
                <WheelCard
                  category={CATEGORIES[key]}
                  result={results[key] ?? null}
                  onResult={(item) => onResult(key, item)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== RODAPÉ ===== */}
      <div className="flex justify-between items-center px-6 py-3 relative z-10">
        {/* VOLTAR */}
        <button
          onClick={onBack}
          className="btn-game bg-[#5B22A8] text-white px-6 py-2"
        >
          ← Voltar
        </button>

        {/* CONTADOR HUD */}
        <div className="hud-counter text-sm">
          {count} / 5 ingredientes coletados
        </div>

        {/* ESCREVER */}
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
