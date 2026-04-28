import tela1 from "@/assets/telas/tela1.png";

type Props = {
  onStart: () => void;
};

export const IntroScreen = ({ onStart }: Props) => {
  return (
    <div
      className="w-full h-full relative animate-fade-in flex items-center justify-center overflow-hidden"
      style={{ background: "hsl(45 60% 98%)" }}
    >
      <div className="relative w-full h-full max-w-[1600px] aspect-[16/9] flex items-center justify-center">
        <img
          src={tela1}
          alt="Uma Fábrica de Histórias Malucas"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />

        <button
          onClick={onStart}
          className="btn-pop absolute z-10 hover:scale-105 active:scale-95 transition-transform"
          style={{
            left: "50%",
            top: "62%",
            transform: "translate(-50%, -50%)",
            minWidth: 320,
            fontSize: 28,
            padding: "20px 40px",
            borderRadius: 999,
            boxShadow: "0 8px 0 #1f7a3f, 0 14px 24px rgba(0,0,0,0.25)",
          }}
          aria-label="Começar a criar"
        >
          ▶ Começar
        </button>
      </div>
    </div>
  );
};
