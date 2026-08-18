# Decisões — Casa Humaitá

Registro das decisões tomadas fora do que os quatro documentos originais definiam,
ou onde eles se contradiziam. Serve para que a próxima sessão não reabra o que já
foi fechado, e para que a divergência com os arquivos aprovados fique rastreável.

---

## D1 · Fidelidade vs. sistema de tokens — regime "Misto"

**Contexto.** Os arquivos em `reference/`, aprovados pelo cliente, contrariam o
`brief.md §3` em quatro pontos.

**Decisão.** Acessibilidade e família tipográfica seguem o brief; tracking e
line-height de assinatura ficam idênticos ao arquivo aprovado.

| Ponto | Arquivo aprovado | Brief §3 | Vale |
|---|---|---|---|
| Eyebrow do hero, tracking | `.42em` | `.22em` | **`.42em`** (token `eyebrow-hero`) |
| `line-height` do H1 | `.9` | `.92` | **`.9`** |
| Rótulos da Localização | Newsreader | Jost | **Jost** |
| Unidade do card de localização | 10px | piso de 11px | **11px** |

O token `eyebrow` geral continua em `.22em`; o hero usa `eyebrow-hero`.

---

## D2 · Jost self-hosted

Não existia no projeto e os dois arquivos de referência a puxavam do Google Fonts,
o que o `CLAUDE.md` proíbe. Baixada do repositório oficial `google/fonts`
(licença OFL, redistribuição permitida), convertida para woff2 com subset latino
por `scripts/make-fonts.mjs`. A licença acompanha em `public/fonts/OFL-Jost.txt`.

Newsreader veio do zip aprovado pelo cliente, mesmo tratamento.

Resultado: 289KB em três arquivos, fora do orçamento de JS.

---

## D3 · Fotos dos 14 cards de Localização

O `assets.md` não mapeia foto para nenhum dos 14 lugares, e o `clip-path: circle()`
que as revela é o efeito central da seção. **O cliente vai enviar as 14 fotos.**
Até lá a seção é construída com o slot vazio e comentário `{/* TODO: falta asset */}`.

---

## D4 · Ritmo da régua de ambientes — duas trocas aplicadas

O `assets.md §3` registrava a pendência: 10 dos 11 cards eram horizontais, então o
compasso 2:1 prometido pelo `brief §7·4` não existia. Aplicadas as duas trocas que
o próprio documento propunha:

| Card | Era | Passa a ser | Ganho |
|---|---|---|---|
| Sala de estar | `s-10` 720×540 H | `s-4` 1200×1604 V | +67% de resolução, e vira vertical |
| Arcos | `j-3` 720×480 H | `j-1` 720×1080 V | vira vertical |

Resultado: verticais nas posições 2, 6 e 11. **Pendência do `assets.md §3` encerrada.**

---

## D5 · PT servido na raiz, sem segmento de locale visível

O `brief §9` pede "rotas com segmento de locale, `pt` como padrão sem prefixo
visível". Com `output: 'export'` não há middleware nem rewrite, então a única forma
de ter `/` sem prefixo apontando para `/pt` seria um redirect por meta-refresh —
custo direto em LCP e em SEO, justamente na página que o brief quer bem posicionada.

**Decisão.** PT na raiz (`/`, `/a-casa`). Todo texto passa por `messages/pt.json` e
pelo `MensagensProvider`; nenhuma string literal em JSX. EN e ES entram como pasta
irmã (`app/en/`) com um wrapper fino — que é exatamente o custo que o §9 queria
evitar pagar depois. `hreflang` aponta só para pt enquanto os outros não existirem.

---

## D6 · Correções de texto não listadas no §12

O `copy.md` é a fonte de verdade (regra 1 do `CLAUDE.md`), e diverge dos arquivos
aprovados em quatro pontos que o `brief §12` não listou. Aplicado o `copy.md`:

| Onde | Arquivo aprovado | Publicado |
|---|---|---|
| Legenda do hero | "quatro suítes sobre a enseada" | "quatro suítes sobre o mar" |
| Subtítulo do hero | "paraíso de búzios" | "paraíso de Búzios" |
| Âncoras do menu | `#reservar`, `#comodos` | `#contato`, `#ambientes` |
| Crédito das avaliações | "Avaliação publicada" | "Avaliações publicadas" |

---

## D7 · Seção 8 passa a ter quatro cards

O cliente incluiu "casamento" no escopo, com as fotos de `vitrine/`. Mapeamento
confirmado: `vitrine-gastronomia`, `vitrine-praias`, `vitrine-regiao` são as capas
dos três cards do `copy.md §8`, na ordem.

**Bloqueio.** O quarto card não tem copy: falta título, tag e contagem listada.
Não pode ser construído sem essas strings (regra 1).

---

## D8 · Pipeline de imagem próprio, sem `next/image`

`output: 'export'` desativa o otimizador do Next. Em vez de `unoptimized` com
`next/image` — que perderia AVIF e o controle de srcset — o projeto gera as
variantes em build (`scripts/prepare-assets.mjs`) e serve por `<picture>`.

Isso permite cumprir mecanicamente as duas regras que mais se perdem na prática:
nunca gerar variante acima da resolução nativa, e `width`/`height` explícitos em
toda imagem, vindos do manifesto. CLS = 0 sem ninguém digitar medida à mão.

---

## Em aberto

| # | Item | Bloqueia |
|---|---|---|
| A1 | Copy do 4º card de "Conheça Búzios" (casamento) | seção 8 |
| A2 | Copy da `/a-casa` — nenhuma string existe | Etapa 3 |
| A3 | Foto da seção 5: `e-4` tem 720×480 e vai a full-bleed | seção 5 |
| A4 | As 14 fotos da Localização | seção 6 |
| A5 | Domínio de produção — canonical, hreflang, sitemap, OG | Etapa 3 |
| A6 | Comportamento do header em mobile — não consta no brief | polimento |
| A7 | Strings de acessibilidade (skip link) escritas pelo desenvolvimento | aprovação |
| A8 | Confirmar que `4,91/5` e `+40 avaliações` seguem correntes | seção 7 |
