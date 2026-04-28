type Props = {
  image: string;
  alt: string;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
};

export const AssetScreen = ({
  image,
  alt,
  onNext,
  onBack,
  nextLabel = "Seguir",
}: Props) => {
  return (
    <div className="w-full h-full relative bg-white animate-fade-in overflow-hidden">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />

      <div className="absolute bottom-6 left-0 w-full px-6 z-10">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto">
          <div>
            {onBack && (
              <button
                onClick={onBack}
                className="btn-purple hover:scale-105 transition"
                aria-label="Voltar"
              >
                ← Voltar
              </button>
            )}
          </div>

          <button
            onClick={onNext}
            className="btn-pop hover:scale-105 transition"
            aria-label={nextLabel}
          >
            {nextLabel} →
          </button>
        </div>
      </div>
    </div>
  );
};
