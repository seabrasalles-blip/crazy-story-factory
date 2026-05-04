## Substituir imagem `tela2.png`

Trocar o asset existente pela nova versão enviada, mantendo o mesmo nome e caminho para que nenhum código precise ser alterado.

### Ação
- Copiar `user-uploads://tela2.png` → `src/assets/telas/tela2.png` (sobrescrevendo o arquivo atual).

### O que NÃO muda
- Nenhum arquivo `.tsx`, `.ts` ou `.css` é alterado.
- O import `import tela2 from "@/assets/telas/tela2.png"` em `src/pages/Index.tsx` continua funcionando.
- A tela de apresentação (`AssetScreen` com `image={tela2}`) passa a exibir automaticamente a nova arte.

### Após aplicar
- Recomendo um refresh com cache limpo (Ctrl+F5 / Cmd+Shift+R) no preview para garantir que a nova imagem apareça.