import { createPortal } from "react-dom";
import { CATEGORIES, CATEGORY_ORDER, type CategoryKey, type Item } from "@/data/catalog";

export type StoryText = { inicio: string; meio: string; fim: string };

type Props = {
  results: Partial<Record<CategoryKey, Item>>;
  story: StoryText;
  onChange: (s: StoryText) => void;
  onBack: () => void;
  onRestart: () => void;
};

const THEME: Record<CategoryKey, string> = {
  personagens: "var(--theme-personagens)",
  amigos: "var(--theme-amigos)",
  viloes: "var(--theme-viloes)",
  cenarios: "var(--theme-cenarios)",
  emocoes: "var(--theme-emocoes)",
};

const FIELD_LABEL: Record<keyof StoryText, { title: string; placeholder: string; color: string }> = {
  inicio: { title: "Começo", placeholder: "Escreva o começo da sua história...", color: "var(--magenta)" },
  meio:   { title: "Meio",   placeholder: "Escreva o meio da sua história...",   color: "var(--theme-cenarios)" },
  fim:    { title: "Final",  placeholder: "Escreva o final da sua história...",  color: "var(--primary)" },
};

export const StoryScreen = ({ results, story, onChange, onBack, onRestart }: Props) => {
  const handlePrint = () => window.print();

  return (
    <div className="w-full h-full bg-cream flex flex-col p-6 animate-fade-in no-print">
      <div className="mb-3">
        <p className="font-display font-bold text-magenta tracking-widest text-sm">
          AGORA É SUA VEZ
        </p>
        <h1 className="font-display font-extrabold text-primary text-3xl leading-tight">
          Escreva a sua história com os elementos sorteados.
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Coluna esquerda: elementos sorteados */}
        <div className="col-span-4 flex flex-col gap-2 overflow-y-auto pr-1">
          {CATEGORY_ORDER.map((key) => {
            const item = results[key];
            if (!item) return null;
            return (
              <div
                key={key}
                className="flex items-center gap-3 bg-white rounded-2xl p-2 border-2"
                style={{ borderColor: `hsl(${THEME[key]} / 0.5)` }}
              >
                <img src={item.image} alt={item.label} className="w-14 h-14 object-contain shrink-0" />
                <div className="leading-tight">
                  <div className="font-display font-bold text-sm" style={{ color: `hsl(${THEME[key]})` }}>
                    {CATEGORIES[key].title}
                  </div>
                  <div className="text-primary font-semibold text-base">{item.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centro: três campos */}
        <div className="col-span-8 flex flex-col gap-3">
          {(Object.keys(FIELD_LABEL) as (keyof StoryText)[]).map((k) => {
            const cfg = FIELD_LABEL[k];
            return (
              <div
                key={k}
                className="bg-white rounded-2xl p-3 border-2 flex-1 flex flex-col"
                style={{ borderColor: `hsl(${cfg.color} / 0.5)` }}
              >
                <div
                  className="self-start px-3 py-0.5 rounded-full text-white font-display font-bold text-sm mb-1"
                  style={{ background: `hsl(${cfg.color})` }}
                >
                  🚩 {cfg.title}
                </div>
                <textarea
                  value={story[k]}
                  onChange={(e) => onChange({ ...story, [k]: e.target.value })}
                  placeholder={cfg.placeholder}
                  className="w-full flex-1 resize-none bg-transparent outline-none text-primary placeholder:text-primary/40 text-base"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button onClick={onBack} className="btn-purple">← Voltar</button>
        <button onClick={onRestart} className="btn-yellow">↺ Reiniciar</button>
        <button onClick={handlePrint} className="btn-magenta">🖨 Imprimir história</button>
      </div>

      {/* Área de impressão (oculta na tela) */}
      <PrintArea results={results} story={story} />
    </div>
  );
};

const PrintArea = ({ results, story }: { results: Props["results"]; story: StoryText }) => {
  const node = (
    <div className="print-area">
      <h1 style={{ fontFamily: '"Baloo 2", cursive', fontSize: 32, color: "#3b1d6b", marginBottom: 4 }}>
        Uma Fábrica de Histórias Malucas!
      </h1>
      <h2 style={{ color: "#666", marginBottom: 20, fontWeight: 500, fontSize: 18 }}>
        Minha história fabricada
      </h2>

      <h3 style={{ color: "#3b1d6b", marginBottom: 10, fontSize: 18 }}>Elementos sorteados</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {CATEGORY_ORDER.map((k) => {
          const it = results[k];
          if (!it) return null;
          return (
            <div
              key={k}
              style={{
                border: "2px solid #d6cce8",
                borderRadius: 12,
                padding: 8,
                textAlign: "center",
              }}
            >
              <img
                src={it.image}
                alt={it.label}
                style={{ width: 70, height: 70, objectFit: "contain", margin: "0 auto" }}
              />
              <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>
                {CATEGORIES[k].title}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#3b1d6b" }}>
                {it.label}
              </div>
            </div>
          );
        })}
      </div>

      {(["inicio", "meio", "fim"] as const).map((k) => (
        <div key={k} style={{ marginBottom: 16, pageBreakInside: "avoid" }}>
          <h3 style={{ color: "#3b1d6b", marginBottom: 6, fontSize: 18 }}>
            {FIELD_LABEL[k].title}
          </h3>
          <p
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.6,
              fontSize: 14,
              color: "#222",
              borderBottom: "1px solid #eee",
              paddingBottom: 8,
              minHeight: 40,
            }}
          >
            {story[k] || "—"}
          </p>
        </div>
      ))}
    </div>
  );
  return createPortal(node, document.body);
};

