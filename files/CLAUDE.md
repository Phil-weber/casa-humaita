# CLAUDE.md — Casa Humaitá

Site de captação para uma casa de aluguel de alto padrão em Armação dos Búzios, RJ.
Leia `docs/brief.md` antes de escrever qualquer linha de código. Todo texto vem de `docs/copy.md`. Toda imagem vem de `docs/assets.md`.

---

## Stack

- **Next.js 15** (App Router, TypeScript, export estático)
- **Tailwind CSS**
- **shadcn/ui** apenas onde houver componente que sirva; não instalar o pacote inteiro
- **Motion** (`motion/react`) para animação
- **Lenis** para smooth scroll
- Fontes **self-hosted**: Newsreader (variável, roman + itálico) e Jost
- Deploy: estático. Sem servidor, sem banco, sem API.

```bash
npm run dev      # desenvolvimento
npm run build    # build estático
npm run lint
npm run typecheck
```

---

## Regras invioláveis

**1. Nunca invente conteúdo.**
Todo texto visível vem de `docs/copy.md`, literalmente. Se falta uma string, pare e pergunte — não escreva um texto de exemplo.

**2. Nunca invente imagem.**
Proibido Unsplash, picsum, placehold.co, `via.placeholder`, SVG de exemplo, ou qualquer imagem externa. As 57 fotos reais estão em `public/images/` e mapeadas em `docs/assets.md`. Se uma imagem não existe, deixe o slot vazio com um comentário `{/* TODO: falta asset */}` e avise no fim.

**3. Nunca invente fato sobre a casa.**
Números, distâncias, quantidade de avaliações, nota, horários: todos estão em `docs/copy.md` e são definitivos. Não arredonde, não some, não "melhore".

**4. Nada de reserva, formulário funcional ou backend nesta fase.**
A seção de contato é visual. Nenhum `onSubmit`, nenhum `fetch`, nenhuma integração. Construa de modo que ligar depois seja trocar um handler, não refazer a seção.

**5. Nenhuma string hardcoded em JSX.**
Português é o único idioma agora, mas tudo passa por `messages/pt.json`. Inglês e espanhol entram depois sem refatoração. Rotas já com segmento de locale.

**6. Pointer Events, nunca mouse-only.**
`onPointerDown` / `onPointerMove` / `onPointerUp`. Toda interação que hoje depende de `hover` precisa de equivalente por toque. Um site cuja maior parte do tráfego é celular não pode ter interação que só funciona com mouse.

**7. Orçamento de efeitos fechado.**
São oito, listados em `docs/brief.md §6`. Não adicione um nono. Sem scroll-jacking além do especificado, sem partículas, sem tilt 3D, sem gradiente animado, sem texto que digita sozinho.

**8. `prefers-reduced-motion` respeitado em todos os oito.**
Sem exceção. Quando ativo: sem preloader, sem pan, sem parallax, sem expansão — o conteúdo aparece direto.

**9. Piso de acessibilidade.**
Texto mínimo 11px. `alt` descritivo em toda imagem. Foco visível no teclado em todo elemento interativo. Contraste AA. Réguas horizontais navegáveis por seta do teclado.

**10. `sessionStorage` só para a flag do preloader.**
Nada mais persiste. Sem cookies, sem analytics nesta fase.

---

## Vocabulário proibido no texto do site

Nunca use, em nenhuma circunstância, mesmo que pareça caber:

> paraíso · inesquecível · experiência única · deslumbrante · exclusivo · sonho · refúgio · aconchegante · imperdível · único no mundo · o melhor de Búzios

Sem ponto de exclamação. Sem superlativo empilhado. Concreto vence adjetivo: "quatro suítes com vista para o mar" é melhor que "vista deslumbrante".

Exceção: a frase do H1 do hero contém a palavra "paraíso" por decisão explícita do cliente. É a única ocorrência permitida no site inteiro.

---

## Ordem de trabalho

1. Ler `docs/brief.md`, `docs/copy.md`, `docs/assets.md` inteiros.
2. Montar o sistema de tokens (`app/globals.css` + `tailwind.config.ts`) exatamente com os valores do brief. Não invente cor, tamanho ou espaçamento que não esteja lá.
3. Gerar a textura: `node scripts/make-texture.mjs` produz `public/textures/plaster.png`.
4. Layout base: header, footer, providers (Lenis, locale).
5. Home, seção por seção, na ordem 0 → 11. **Uma seção por vez, terminada antes de começar a próxima.**
6. Rotas internas.
7. Auditoria (abaixo).

Nas seções 1 (Hero) e 6 (Localização), há código já aprovado pelo cliente em `reference/`. **Porte o layout e o comportamento fielmente**, aplicando somente as correções listadas em `docs/brief.md §12`. Não redesenhe.

---

## Skills

Instaladas neste projeto:

- **`pbakaus/impeccable`** — autoridade única de design. Depois de cada seção pronta, rode `/audit` e aplique. No fim da home, rode `/critique`.
- **`emilkowalski/skills`** — consultar antes de escrever qualquer animação. Duração, easing e o que não animar.
- **`mattbx/shadcn-skills`** — só para descobrir componente que já resolva algo.

Se houver conflito entre uma skill e este arquivo ou o brief, **o brief ganha.**

---

## Definição de pronto

Uma seção só está pronta quando:

- [ ] Renderiza correto em 390px, 768px, 1440px e 2560px
- [ ] Funciona por toque, sem depender de hover
- [ ] Passa no `/audit` do Impeccable
- [ ] Respeita `prefers-reduced-motion`
- [ ] Navegável por teclado com foco visível
- [ ] Nenhuma string fora de `messages/pt.json`
- [ ] Toda imagem com `width`/`height` explícitos (zero CLS)
- [ ] `npm run build` e `npm run typecheck` sem erro

## Orçamento de performance da home

- LCP < 2,5s em 4G simulado
- JS total < 200KB gzip
- CLS = 0
- Imagens em AVIF com fallback WebP, `srcset` responsivo
- Só a imagem do hero com `priority`; todas as outras `loading="lazy"`

---

## Quando parar e perguntar

- Falta um asset ou uma string
- Uma correção do §12 conflita com o layout aprovado
- Um efeito do orçamento não roda a 60fps no celular
- Você sentiu vontade de adicionar algo que não está no brief

Perguntar custa uma mensagem. Refazer custa uma sessão.
