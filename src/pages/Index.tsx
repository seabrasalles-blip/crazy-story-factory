import { useState } from "react";
import { Stage } from "@/components/Stage";
import { IntroScreen } from "@/components/IntroScreen";
import { AssetScreen } from "@/components/AssetScreen";
import { RouletteScreen } from "@/components/RouletteScreen";
import { StoryScreen, type StoryText } from "@/components/StoryScreen";
import { StoryViewScreen } from "@/components/StoryViewScreen";
import type { CategoryKey, Item } from "@/data/catalog";

import tela2 from "@/assets/telas/tela2.png";
import telaPersonagens from "@/assets/telas/tela-personagens.png";
import telaAmigos from "@/assets/telas/tela-amigos.png";
import telaViloes from "@/assets/telas/tela-viloes.png";
import telaCenarios from "@/assets/telas/tela-cenarios.png";
import telaEmocoes from "@/assets/telas/tela-emocoes.png";

type ScreenId =
  | "intro"
  | "apresentacao"
  | "personagens"
  | "amigos"
  | "viloes"
  | "cenarios"
  | "emocoes"
  | "roletas"
  | "historia"
  | "visualizacao";

const FLOW: ScreenId[] = [
  "intro",
  "apresentacao",
  "personagens",
  "amigos",
  "viloes",
  "cenarios",
  "emocoes",
  "roletas",
  "historia",
];

const Index = () => {
  const [screen, setScreen] = useState<ScreenId>("intro");
  const [results, setResults] = useState<Partial<Record<CategoryKey, Item>>>({});
  const [story, setStory] = useState<StoryText>({ inicio: "", meio: "", fim: "" });
  const [title, setTitle] = useState<string>("");

  const goNext = () => {
    const i = FLOW.indexOf(screen);
    if (i < FLOW.length - 1) setScreen(FLOW[i + 1]);
  };
  const goBack = () => {
    const i = FLOW.indexOf(screen);
    if (i > 0) setScreen(FLOW[i - 1]);
  };

  const handleResult = (key: CategoryKey, item: Item) =>
    setResults((r) => ({ ...r, [key]: item }));

  const restart = () => {
    setResults({});
    setStory({ inicio: "", meio: "", fim: "" });
    setTitle("");
    setScreen("intro");
  };

  return (
    <Stage>
      {screen === "intro" && <IntroScreen onStart={goNext} />}

      {screen === "apresentacao" && (
        <AssetScreen image={tela2} alt="Olá! Eu sou a Ana Maria" onNext={goNext} onBack={goBack} />
      )}
      {screen === "personagens" && (
        <AssetScreen image={telaPersonagens} alt="Roleta dos Personagens" onNext={goNext} onBack={goBack} />
      )}
      {screen === "amigos" && (
        <AssetScreen image={telaAmigos} alt="Roleta dos Amigos" onNext={goNext} onBack={goBack} />
      )}
      {screen === "viloes" && (
        <AssetScreen image={telaViloes} alt="Roleta dos Vilões" onNext={goNext} onBack={goBack} />
      )}
      {screen === "cenarios" && (
        <AssetScreen image={telaCenarios} alt="Roleta dos Cenários" onNext={goNext} onBack={goBack} />
      )}
      {screen === "emocoes" && (
        <AssetScreen
          image={telaEmocoes}
          alt="Roleta das Emoções"
          onNext={goNext}
          onBack={goBack}
          nextLabel="Ir para as roletas"
        />
      )}

      {screen === "roletas" && (
        <RouletteScreen
          results={results}
          onResult={handleResult}
          onWrite={() => setScreen("historia")}
          onBack={() => setScreen("emocoes")}
        />
      )}

      {screen === "historia" && (
        <StoryScreen
          results={results}
          story={story}
          onChange={setStory}
          onBack={() => setScreen("roletas")}
          onRestart={restart}
          onView={() => setScreen("visualizacao")}
        />
      )}

      {screen === "visualizacao" && (
        <StoryViewScreen
          results={results}
          story={story}
          title={title}
          onTitleChange={setTitle}
          onBack={() => setScreen("historia")}
          onRestart={restart}
        />
      )}
    </Stage>
  );
};

export default Index;
