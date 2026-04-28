import tela1 from "@/assets/telas/tela1.png";

type Props = { onStart: () => void };

export const IntroScreen = ({ onStart }: Props) => {
  return (
    <div
      className="w-full h-full relative animate-fade-in flex items-center justify-center"
      style={{ background: "hsl(45 60% 98%)" }}
    >
      <img
        src={tela1}
        alt="Uma Fábrica de Histórias Malucas"
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />
      {/* Botão sobreposto sobre a área verde da capa */}
      <button
        onClick={onStart}
        className="btn-pop absolute"
        style={{
          left: "50%",
          top: "58%",
          transform: "translate(-50%, -50%)",
          minWidth: 320,
          fontSize: 28,
          padding: "20px 40px",
        }}
        aria-label="Começar a criar"
      >
        ▶ Começar
      </button>
    </div>
  );
};
