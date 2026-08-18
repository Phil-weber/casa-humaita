# Prompt de kickoff — colar no Claude Code

> Antes de colar: monte a pasta assim.
>
> ```
> casa-humaita/
> ├── CLAUDE.md
> ├── docs/
> │   ├── brief.md
> │   ├── copy.md
> │   └── assets.md
> ├── reference/
> │   ├── hero.html          ← "Casa Humaita Hero.dc.html"
> │   └── localizacao.html   ← "Localizacao.dc.html"
> └── public/
>     ├── images/            ← as 57 fotos
>     └── brand/             ← as 4 logos + hero-casa-humaita.png + mapa.png
> ```
>
> Instale as skills antes de começar:
> ```
> /plugin marketplace add pbakaus/impeccable
> /plugin marketplace add emilkowalski/skills
> /plugin marketplace add mattbx/shadcn-skills
> ```

---

## Cole isto:

Você é o design lead deste projeto. Vamos construir o site da Casa Humaitá, uma casa de aluguel de alto padrão em Búzios.

**Antes de escrever qualquer código, leia na íntegra, nesta ordem:**
`CLAUDE.md` → `docs/brief.md` → `docs/copy.md` → `docs/assets.md`

Esses quatro arquivos são a especificação completa. Foram construídos ao longo de uma sessão inteira de decisões com o cliente, e cada escolha ali é deliberada — inclusive as que parecem estranhas. **Onde o brief define, o brief manda.** Não substitua uma decisão por um padrão seu, mesmo que o seu pareça melhor.

Três coisas que valem repetir porque são as mais fáceis de errar:

1. **Nenhum conteúdo inventado.** Todo texto sai de `copy.md`. Toda imagem sai de `assets.md`. Zero Unsplash, zero picsum, zero lorem, zero número arredondado. Se falta algo, pare e pergunte.
2. **`reference/hero.html` e `reference/localizacao.html` já foram aprovados pelo cliente.** Porte o layout e o comportamento fielmente, aplicando somente as correções de `brief.md §12`. Não redesenhe, não "melhore".
3. **O orçamento de efeitos é fechado em oito** (`brief.md §6`). Não existe o nono.

**Sua primeira entrega não é código.** É um plano, aqui no chat, com:

- o sistema de tokens que você vai escrever em `globals.css` e `tailwind.config.ts`, derivado de `brief.md §3` — sem inventar valor que não esteja lá
- a lista de arquivos que você vai criar, na ordem
- as três decisões de implementação que você considera mais arriscadas, com como pretende resolver cada uma
- qualquer contradição que você tenha encontrado entre os quatro documentos

Eu aprovo o plano, e só então você começa a codar.

Depois disso, construa **uma seção por vez**, na ordem 0 → 11 da home. Ao terminar cada uma: rode `/audit` do Impeccable, aplique, e me mostre antes de seguir para a próxima. Não avance sozinho por três seções.

Consulte `emilkowalski/skills` antes de escrever qualquer animação.

Stack: Next.js 15 App Router, TypeScript, Tailwind, export estático, Motion, Lenis, fontes self-hosted (Newsreader + Jost).

Escopo desta rodada: **a home inteira e polida**, mais o roteamento das páginas internas com `/a-casa` preenchida. As outras rotas ficam declaradas com layout vazio.
