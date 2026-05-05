# Refinamento visual — Tela das Roletas

Polir apenas a aparência e microinterações da tela das roletas. Nenhuma mudança de lógica, dados, fluxo ou navegação. Sem mexer na tela de escrita.

## Arquivos a alterar

- `src/index.css` — novas classes utilitárias e keyframes
- `src/components/RouletteScreen.tsx` — fundo, contador HUD, botões, hover dos cards
- `src/components/WheelCard.tsx` — brilho da roleta, animação do resultado, altura uniforme

## 1. Fundo (`RouletteScreen.tsx` + `index.css`)

Substituir `bg-white` por uma nova classe `roulette-screen-bg`:

- Gradiente: `linear-gradient(180deg, #FFF8ED 0%, #FFEEDB 100%)`
- Camada decorativa sutil via `::before` com pequenos pontos/estrelas usando `radial-gradient` repetidos em baixa opacidade (~0.08), sem poluir.

## 2. Cards das roletas

- Manter grid de 5 colunas e alinhamento atual.
- Suavizar sombra: trocar `shadow-[0_6px_0_#1D2540]` por sombra mais leve combinando `0 4px 0 #1D2540` + `0 8px 16px rgba(29,37,64,0.15)`.
- Adicionar classe `wheel-card-hover` com `transition: transform .2s` e `hover:-translate-y-1` (≈4px).
- Forçar mesma altura: aplicar `h-full` nos cards e `items-stretch` no grid (em vez de `items-center`), garantindo cards uniformes independente do estado (com/sem resultado).

## 3. Roletas (`WheelCard.tsx`)

- Brilho base no SVG: `drop-shadow(0 0 8px rgba(255, 210, 63, 0.55))` quando parado.
- Brilho intensificado durante o spin: `drop-shadow(0 0 14px rgba(255, 210, 63, 0.85))`.
- Manter as 6 fatias atuais sem texto/números.

## 4. Resultado sorteado

- Envolver o resultado em uma "carta de item desbloqueado":
  - Caixa branca, borda `#1D2540`, `border-radius: 16px`, sombra leve.
  - Imagem centralizada (mantém 80×80, `object-contain`).
  - Label centralizado, branco com leve text-shadow para legibilidade sobre o card colorido.
- Adicionar keyframe `pop-in`:
  ```text
  0%   -> scale(0.92) opacity 0
  60%  -> scale(1.04)
  100% -> scale(1) opacity 1
  ```
  Aplicado via classe `animate-pop-in` ao container do resultado.

## 5. Contador (HUD)

Substituir o texto simples por um chip HUD:

- Fundo `#1D2540`, texto `#FFD23F`, borda arredondada `999px`, padding `8px 18px`.
- Brilho interno via `box-shadow: inset 0 0 8px rgba(255,210,63,0.25)` + sombra externa leve.
- Texto: `"{count} / 5 ingredientes coletados"`.

## 6. Botão "Escrever história"

- Desativado: `bg-[#E5E7EB]` com texto `#1D2540` legível, sem `cursor-not-allowed` agressivo (manter `disabled`).
- Ativado: `bg-[#35C759]` + classe `animate-ready-pulse` (pulse/glow suave em loop).
- `active:translate-y-[2px]` e redução de sombra para efeito físico de pressionar.

## 7. Botões gerais (Voltar + Escrever)

Criar classe utilitária `btn-game`:
- Borda branca 4px, sombra escura `0 5px 0 #1D2540`, `rounded-full`.
- `hover:scale-[1.02]`, `active:translate-y-[2px] active:shadow-[0_2px_0_#1D2540]`.
- Transição rápida `.15s`.

## 8. Microinterações (resumo das classes)

- `.wheel-card-hover` — sobe 4px no hover.
- `.btn-game` — hover scale 1.02, active desce 2px.
- `.animate-pop-in` — resultado.
- `.animate-ready-pulse` — botão escrever quando habilitado.
- Spin: `filter` muda dinamicamente conforme `spinning`.

## 9. Responsividade

- Manter `grid-cols-5`, `gap-6`, padding existente.
- Trocar `min-h-screen` por `h-screen overflow-hidden` para garantir 16:9 sem barra de rolagem.
- Reduzir levemente paddings verticais do topo/rodapé se necessário para caber.
- Cards usam `h-full` + conteúdo com `flex flex-col justify-between` para não cortarem.

## Garantias

- Nenhuma alteração em `catalog.ts`, lógica de sorteio, navegação, ou `StoryScreen`.
- Nenhuma nova tela, nenhum quiz, nenhuma finalização automática.
