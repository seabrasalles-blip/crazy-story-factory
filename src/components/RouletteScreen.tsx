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
    <div className="min-h-screen bg-white flex flex-col animate-fade-in overflow-hidden">
      {/* CABEÇALHO */}
      <header
        style={{
          background: "#FFFFFF",
          borderBottom: "4px solid #1D2540",
          boxShadow: "0 5px 0 #1D2540",
          padding: "14px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: 100 }} />

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                background: "#5B22A8",
                color: "#FFD23F",
                padding: "6px 18px",
                borderRadius: 999,
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: "0.12em",
                boxShadow: "0 3px 0 #1D2540",
              }}
            >
              FÁBRICA DE HISTÓRIAS
            </div>

            <h1
              style={{
                margin: "6px 0 0",
                fontSize: 32,
                lineHeight: 1,
                fontWeight: 900,
                color: "#5B22A8",
              }}
            >
              Gire as roletas!
            </h1>

            <p
              style={{
                margin: "4px 0 0",
                fontSize: 15,
                color: "#1D2540",
                fontWeight: 700,
                opacity: 0.75,
              }}
            >
              Descubra os ingredientes da sua história
            </p>
          </div>

          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "#FFD23F",
              border: "4px solid #1D2540",
              boxShadow: "0 5px 0 #1D2540",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
            aria-hidden="true"
          >
            🎡
          </div>
        </div>
      </header>

      {/* ÁREA DAS ROLETA */}
      <main
        className="flex-1"
        style={{
          padding: "24px 28px 16px",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {CATEGORY_ORDER.map((key) => (
            <WheelCard
              key={key}
              category={CATEGORIES[key]}
              result={results[key] ?? null}
              onResult={(item) => onResult(key, item)}
            />
          ))}
        </div>
      </main>

      {/* RODAPÉ */}
      <footer
        style={{
          background: "#FFFFFF",
          borderTop: "4px solid #1D2540",
          boxShadow: "0 -4px 0 rgba(29, 37, 64, 0.15)",
          padding: "14px 28px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <button
            onClick={onBack}
            className="btn-purple"
            style={{
              padding: "10px 24px",
              fontSize: 16,
            }}
          >
            ← Voltar
          </button>

          <div
            style={{
              background: "#1D2540",
              color: "#FFD23F",
              padding: "10px 22px",
              borderRadius: 999,
              fontWeight: 900,
              border: "3px solid #FFD23F",
              boxShadow: "inset 0 0 10px rgba(255, 210, 63, 0.35)",
            }}
          >
            {count} / 5 ingredientes coletados
          </div>

          <button
            onClick={onWrite}
            disabled={!allDone}
            className="btn-pop"
            style={{
              padding: "10px 26px",
              fontSize: 16,
              opacity: allDone ? 1 : 0.55,
              cursor: allDone ? "pointer" : "not-allowed",
            }}
          >
            ✏️ Escrever história →
          </button>
        </div>
      </footer>
    </div>
  );
};
