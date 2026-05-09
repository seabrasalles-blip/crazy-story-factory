import { useEffect, useState } from "react";

/**
 * Stage: container 16:9 que escala automaticamente para caber em qualquer
 * viewport (ideal para iframe Genially). Conteúdo é desenhado em 1366x768.
 */
const BASE_W = 1366;
const BASE_H = 768;

export const Stage = ({ children }: { children: React.ReactNode }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const s = Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H);
      setScale(s);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-cream flex items-center justify-center">
      <div
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
       className="relative shadow-soft rounded-3xl overflow-hidden bg-transparent"
      >
        {children}
      </div>
    </div>
  );
};
