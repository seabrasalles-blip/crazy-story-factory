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

export type Item = { id: string; label: string; image: string };

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
      { id: "astronauta", label: "Astronauta", image: astronauta },
      { id: "menino-curioso", label: "Menino curioso", image: meninoCurioso },
      { id: "robo", label: "Robô", image: robo },
      { id: "pirata", label: "Pirata", image: pirata },
      { id: "menina-curiosa", label: "Menina curiosa", image: meninaCuriosa },
      { id: "cachorro", label: "Cachorro falante", image: cachorroFalante },
    ],
  },
  amigos: {
    key: "amigos",
    title: "Amigos",
    subtitle: "Escolha o amigo que vai acompanhar o seu personagem!",
    items: [
      { id: "dragao", label: "Dragão", image: dragao },
      { id: "gato", label: "Gato", image: gato },
      { id: "alienigena", label: "Alienígena", image: alienigena },
      { id: "fada", label: "Fada", image: fada },
      { id: "inventor", label: "Inventor", image: inventor },
      { id: "tartaruga", label: "Tartaruga", image: tartaruga },
    ],
  },
  viloes: {
    key: "viloes",
    title: "Vilões",
    subtitle: "Quem vai criar confusão na sua história?",
    items: [
      { id: "mago", label: "Mago", image: feiticeiro },
      { id: "bruxa", label: "Bruxa", image: bruxa },
      { id: "robo-mal", label: "Robô do mal", image: roboMal },
      { id: "gigante", label: "Gigante", image: gigante },
      { id: "ladrao", label: "Ladrão", image: ladrao },
      { id: "fantasma", label: "Fantasma", image: monstroInvisivel },
    ],
  },
  cenarios: {
    key: "cenarios",
    title: "Cenários",
    subtitle: "Onde a sua história vai acontecer?",
    items: [
      { id: "fundo-do-mar", label: "Fundo do mar", image: fundoDoMar },
      { id: "castelo", label: "Castelo", image: castelo },
      { id: "floresta", label: "Floresta", image: floresta },
      { id: "planeta", label: "Planeta distante", image: outroPlaneta },
      { id: "cidade", label: "Cidade do futuro", image: cidadeFuturo },
      { id: "ilha", label: "Ilha", image: ilha },
    ],
  },
  emocoes: {
    key: "emocoes",
    title: "Emoções",
    subtitle: "Como o personagem começa a sua história?",
    items: [
      { id: "feliz", label: "Feliz", image: feliz },
      { id: "triste", label: "Triste", image: triste },
      { id: "assustado", label: "Assustado", image: assustado },
      { id: "bravo", label: "Bravo", image: bravo },
      { id: "surpreso", label: "Surpreso", image: surpreso },
      { id: "animado", label: "Animado", image: animado },
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
  "hsl(var(--slice-1))",
  "hsl(var(--slice-2))",
  "hsl(var(--slice-3))",
  "hsl(var(--slice-4))",
  "hsl(var(--slice-5))",
  "hsl(var(--slice-6))",
];
