type Props = {
  image: string;
  alt: string;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
};

/**
 * AssetScreen: usa um asset de tela cheia como fundo e adiciona apenas
 * os botões de navegação na faixa inferior, fora da arte.
 */
export const AssetScreen = ({ image, alt, onNext, onBack, nextLabel = "Seguir" }: Props) => {
  return (
  <div className="absolute bottom-6 left-0 w-full px-6 z-10">
  <div className="flex justify-between items-center max-w-[1200px] mx-auto">
    
    {/* BOTÃO VOLTAR */}
    {onBack && (
      <button
        onClick={onBack}
        className="btn-purple hover:scale-105 transition"
        aria-label="Voltar"
      >
        ← Voltar
      </button>
    )}

    {/* BOTÃO SEGUIR */}
    <button
      onClick={onNext}
      className="btn-pop hover:scale-105 transition"
      aria-label={nextLabel}
    >
      {nextLabel} →
    </button>

  </div>
</div>
