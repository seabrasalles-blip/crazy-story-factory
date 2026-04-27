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
    <div className="w-full h-full relative bg-white animate-fade-in">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-4 z-10">
        {onBack && (
          <button onClick={onBack} className="btn-purple" aria-label="Voltar">
            ← Voltar
          </button>
        )}
        <button onClick={onNext} className="btn-pop" aria-label={nextLabel}>
          {nextLabel} →
        </button>
      </div>
    </div>
  );
};
