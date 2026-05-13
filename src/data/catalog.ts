// Catálogo de elementos da Fábrica de Histórias Malucas.
// Importa diretamente os assets para garantir bundling correto.

import astronauta from "@/assets/personagens/astronauta.png";
import meninoCurioso from "@/assets/personagens/meninocurioso.png";
import robo from "@/assets/personagens/robo.png";
import pirata from "@/assets/personagens/pirata.png";
import meninaCuriosa from "@/assets/personagens/meninacuriosa.png";
import cachorroFalante from "@/assets/personagens/cachorrofalante.png";

import dragao from "@/assets/amigos/dragao.png";
import gato from "@/assets/amigos/gato.png";
import alienigena from "@/assets/amigos/alienigena.png";
import fada from "@/assets/amigos/fadadistraida.png";
import inventor from "@/assets/amigos/inventor.png";
import tartaruga from "@/assets/amigos/tartarugasabia.png";

import feiticeiro from "@/assets/viloes/feiticeiro.png";
import bruxa from "@/assets/viloes/bruxa.png";
import roboMal from "@/assets/viloes/robodomal.png";
import gigante from "@/assets/viloes/gigante.png";
import ladrao from "@/assets/viloes/ladrao.png";
import monstroInvisivel from "@/assets/viloes/monstroinvisivel.png";

import fundoDoMar from "@/assets/cenarios/fundodomar.png";
import castelo from "@/assets/cenarios/castelo.png";
import floresta from "@/assets/cenarios/florestaencaantada.png";
import outroPlaneta from "@/assets/cenarios/outroplaneta.png";
import cidadeFuturo from "@/assets/cenarios/cidadefuturistica.png";
import ilha from "@/assets/cenarios/ilhadeserta.png";

import feliz from "@/assets/emocoes/feliz.png";
import triste from "@/assets/emocoes/triste.png";
import assustado from "@/assets/emocoes/assustado.png";
import bravo from "@/assets/emocoes/bravo.png";
import surpreso from "@/assets/emocoes/surpreso.png";
import animado from "@/assets/emocoes/animado.png";

export type Item = { id: string; label: string; image: string; description?: string };

export type CategoryKey = "personagens" | "cenarios" | "amigos" | "viloes" | "emocoes";

export type Category = {
  key: CategoryKey;
  title: string;
  subtitle: string;
  items: Item[];
};

export const CATEGORIES: Record<CategoryKey, Category> = {
  personagens: {
    key: "personagens",
    title: "Personagens",
    subtitle: "Escolha quem será o personagem principal da sua história!",
    items: [
      { id: "astronauta", label: "Astronauta", image: astronauta, description: "Explora estrelas e planetas com muita coragem." },
      { id: "menino-curioso", label: "Menino curioso", image: meninoCurioso, description: "Adora descobrir como as coisas funcionam." },
      { id: "robo", label: "Robô", image: robo, description: "Inteligente, brilhante e cheio de invenções." },
      { id: "pirata", label: "Pirata", image: pirata, description: "Corajoso e sempre pronto para aventuras no mar." },
      { id: "menina-curiosa", label: "Menina curiosa", image: meninaCuriosa, description: "Faz mil perguntas e ama descobrir segredos." },
      { id: "cachorro", label: "Cachorro falante", image: cachorroFalante, description: "Amigo fiel que solta piadas e dá conselhos." },
    ],
  },
  amigos: {
    key: "amigos",
    title: "Amigos",
    subtitle: "Escolha o amigo que vai acompanhar o seu personagem!",
    items: [
      { id: "dragao", label: "Dragão", image: dragao, description: "Solta fogo, mas tem coração gentil." },
      { id: "gato", label: "Gato", image: gato, description: "Esperto, brincalhão e cheio de mistério." },
      { id: "alienigena", label: "Alienígena", image: alienigena, description: "Veio de outro planeta para fazer amizade." },
      { id: "fada", label: "Fada", image: fada, description: "Distraída, mas com magia poderosa." },
      { id: "inventor", label: "Inventor", image: inventor, description: "Cria máquinas malucas para ajudar os amigos." },
      { id: "tartaruga", label: "Tartaruga", image: tartaruga, description: "Lenta, mas muito sábia e paciente." },
    ],
  },
  viloes: {
    key: "viloes",
    title: "Vilões",
    subtitle: "Quem vai criar confusão na sua história?",
    items: [
      { id: "mago", label: "Mago", image: feiticeiro, description: "Faz feitiços travessos para confundir todos." },
      { id: "bruxa", label: "Bruxa", image: bruxa, description: "Prepara poções estranhas no seu caldeirão." },
      { id: "robo-mal", label: "Robô do mal", image: roboMal, description: "Quer dominar tudo com seus parafusos." },
      { id: "gigante", label: "Gigante", image: gigante, description: "Enorme e barulhento, faz a terra tremer." },
      { id: "ladrao", label: "Ladrão", image: ladrao, description: "Esperto e veloz, sempre tramando algo." },
      { id: "fantasma", label: "Fantasma", image: monstroInvisivel, description: "Invisível e silencioso, aparece de surpresa." },
    ],
  },
  cenarios: {
    key: "cenarios",
    title: "Cenários",
    subtitle: "Onde a sua história vai acontecer?",
    items: [
      { id: "fundo-do-mar", label: "Fundo do mar", image: fundoDoMar, description: "Cheio de peixes coloridos e tesouros escondidos." },
      { id: "castelo", label: "Castelo", image: castelo, description: "Antigo, com torres altas e muitos segredos." },
      { id: "floresta", label: "Floresta", image: floresta, description: "Mágica, com árvores que sussurram histórias." },
      { id: "planeta", label: "Planeta distante", image: outroPlaneta, description: "Um lugar estranho, com cores nunca vistas." },
      { id: "cidade", label: "Cidade do futuro", image: cidadeFuturo, description: "Carros voadores e prédios brilhantes." },
      { id: "ilha", label: "Ilha", image: ilha, description: "Deserta, com palmeiras e muitos mistérios." },
    ],
  },
  emocoes: {
    key: "emocoes",
    title: "Emoções",
    subtitle: "Como o personagem começa a sua história?",
    items: [
      { id: "feliz", label: "Feliz", image: feliz, description: "Sorriso enorme e coração leve." },
      { id: "triste", label: "Triste", image: triste, description: "Coração apertado, com vontade de chorar." },
      { id: "assustado", label: "Assustado", image: assustado, description: "Olhos arregalados e pernas tremendo." },
      { id: "bravo", label: "Bravo", image: bravo, description: "Cara fechada, com vontade de resmungar." },
      { id: "surpreso", label: "Surpreso", image: surpreso, description: "Boca aberta, sem acreditar no que viu." },
      { id: "animado", label: "Animado", image: animado, description: "Cheio de energia, querendo pular de alegria." },
    ],
  },
};

export const CATEGORY_ORDER: CategoryKey[] = [
  "personagens",
  "cenarios",
  "amigos",
  "viloes",
  "emocoes",
];

export const SLICE_COLORS = [
  "#FF8A00", // laranja
  "#FFD23F", // amarelo
  "#22B8E8", // azul
  "#FF4F93", // rosa
  "#35C759", // verde
  "#7A35D8", // roxo
];
