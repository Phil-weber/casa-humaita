# Assets — Casa Humaitá

## 1. Inventário

**59 arquivos de foto, 57 imagens únicas.** Duas duplicatas exatas (mesmo hash): `s-1` = `s-2` e `j-1` = `j-4`. Usar apenas `s-1` e `j-1`; `s-2` e `j-4` podem ser descartados.

**Apenas 19 das 57 fotos têm 1200px de largura. As outras 38 estão em 720px.** Nenhuma passa de 1200px. A única exceção do projeto é o hero, em 2730×1536.

Consequência prática: **dimensione cada frame para não exceder a resolução nativa da foto.** Uma foto de 720px exibida num frame de 1000px vai aparecer borrada. Não fazer upscale em build.

| Grupo | Arquivos | Em 1200px |
|---|---|---|
| Sala (`s-1` … `s-14`) | 14 | `s-4` `s-6` `s-7` `s-11` |
| Cozinha (`cozinha-1` … `-6`) | 6 | `cozinha-1` `cozinha-4` |
| Quartos (`q-1` … `q-11`) | 11 | `q-1` `q-2` `q-5` `q-6` `q-8` |
| Banheiros (`b-1` … `b-6`) | 6 | `b-1` `b-4` `b-5` `b-6` |
| Piscina (`p-1` … `p-7`) | 7 | `p-1` `p-4` |
| Churrasqueira (`c-1`, `c-2`) | 2 | — |
| Jardim (`j-1` … `j-7`) | 7 | `j-5` |
| Exteriores (`e-1` … `e-6`) | 6 | `e-6` (`e-3` em 1024) |

**As sete verticais do acervo** — importantes porque são escassas:
`s-1` 720×960 · `s-4` 1200×1604 · `q-1` 1200×1600 · `j-1` 720×1080 · `j-6` 720×1070 · `e-2` 720×1080

Todo o resto é horizontal.

---

## 2. Marca e hero

| Arquivo | Dimensão | Uso |
|---|---|---|
| `logo-humaita.png` | 512×359 | preloader (azul sobre branco) |
| `logo-humaita-branca.png` | 597×418 | header e rodapé |
| `passaro-logo.png` | 597×418 | manifesto, e animação de entrada quando houver SVG |
| `logo_lp.png` | 500×500 | crédito no rodapé — **branca pura, só funciona sobre escuro** |
| `hero-casa-humaita.png` | 1952×2176 | hero, pan vertical |
| `preloader.png` | 1920×1080 | referência de composição do preloader; o preloader é construído em CSS, não com esta imagem |
| `mapa.png` | 1920×1080 | mapa da seção de localização |

**Azul da marca: `#0170B2`**, extraído do PNG da logo — não é estimativa.
**Topo da imagem do hero: `RGB(2,115,195)`** — praticamente o azul da marca. É isso que permite a transição contínua do preloader para o céu.

Logo disponível só em PNG. Ver `brief.md §11`.

---

## 3. Régua de ambientes — mapeamento

Ordem e fotos definidas pelo cliente:

| # | Card | Foto | Nativo | Orientação |
|---|---|---|---|---|
| 1 | A vista | `e-6` | 1200×800 | H |
| 2 | Sala de estar | `s-10` | 720×540 | H |
| 3 | Cozinha | `cozinha-1` | 1200×900 | H |
| 4 | Suíte principal | `q-8` | 1200×800 | H |
| 5 | Suíte 1 | `q-3` | 720×480 | H |
| 6 | Suíte 2 | `q-1` | 1200×1600 | **V** |
| 7 | Suíte 3 | `q-5` | 1200×800 | H |
| 8 | Piscina | `p-1` | 1200×900 | H |
| 9 | Churrasqueira | `c-1` | 720×480 | H |
| 10 | Jardim | `p-3` | 720×540 | H |
| 11 | Arcos | `j-3` | 720×480 | H |

> `Jardim = p-3` e `Arcos = j-3` estão trocados em relação ao prefixo do arquivo. **É intencional** — confirmado pelo cliente. Os enquadramentos batem com os rótulos.

### ⚠ Pendência aberta: o ritmo da régua

**Dez dos onze cards são horizontais.** Só a Suíte 2 é vertical.

O brief especifica altura fixa com largura derivada da proporção nativa — o que deveria produzir um compasso alternando cards largos e estreitos. Com 10 horizontais seguidas, esse compasso não existe: a régua fica uma fileira de retângulos quase idênticos.

**Duas trocas resolvem o ritmo e melhoram a resolução ao mesmo tempo:**

| Card | Atual | Proposta | Ganho |
|---|---|---|---|
| Sala de estar | `s-10` 720×540 H | `s-4` **1200×1604 V** | +67% de resolução e vira vertical |
| Arcos | `j-3` 720×480 H | `j-1` **720×1080 V** | vira vertical; é a composição mais forte do acervo (arco emoldurando o sol sobre a piscina) |

Resultado: 3 verticais entre 11 cards, distribuídas nas posições 2, 6 e 11 — compasso real.

**Aguardando decisão do cliente. Até lá, implementar o mapeamento da tabela acima como está.**

---

## 4. Galerias do módulo ampliado

Ao abrir a seta `→` de cada card, o overlay mostra as fotos daquele ambiente:

```
A vista            e-6, e-1, q-11, q-10, j-1, e-2
Sala de estar      s-3 … s-14 (exceto s-2, duplicata), s-1, s-4
Cozinha            cozinha-1, cozinha-2, cozinha-3, cozinha-4, cozinha-5, cozinha-6
Suíte principal    q-6, q-7, q-8, q-9, q-10, q-11 + b-1, b-2, b-3
Suíte 1            q-3
Suíte 2            q-1 + b-4, b-5
Suíte 3            q-4, q-5 + b-6
Piscina            p-1, p-2, p-4, p-5, p-6, p-7
Churrasqueira      c-1, c-2
Jardim             p-3, j-5, j-6, j-7
Arcos              j-1, j-2, j-3, e-3
```

Notas:
- **`q-2` está fora por decisão do cliente** — é o mesmo quarto de `q-3`, e `q-3` foi considerada mais bonita. (Registro: `q-2` tem 1200×900 e `q-3` tem 720×480 — a escolha trocou resolução por composição, de forma consciente.)
- A Suíte 1 tem uma única foto e **não tem foto de banheiro**. O módulo ampliado precisa funcionar com um item só: sem setas, sem contador.
- Os banheiros aparecem duas vezes: dentro da suíte correspondente e, na página `/a-casa`, também como grupo próprio.
- Fotos noturnas (`s-5`, `p-6`, `p-7`, `j-6`) têm qualidade de registro, não de venda. Mantê-las no fim das galerias, nunca como capa de card.

---

## 5. Pipeline de imagem

- Converter tudo para **AVIF** com fallback **WebP**. Manter o original.
- `srcset` responsivo, **sem gerar variante acima da resolução nativa**.
- `width` e `height` explícitos em toda `<img>` — CLS tem que ser zero.
- Só o hero com `priority` / `fetchpriority="high"`. Todas as outras `loading="lazy"`.
- Open Graph: 1200×630 recortado do hero.
- `alt` em todas. Padrão de escrita em `copy.md §12`.

---

## 6. O que falta produzir

| Item | Impacto | Bloqueia? |
|---|---|---|
| Logo em vetor (SVG/AI) | preloader, header, favicon, mapa — quatro pontos visíveis | não |
| Originais em alta das fotos profissionais | teto de 1200px em todas as seções fora do hero | não |
| `plaster.png` (textura) | fundo de todas as seções claras | **sim** — gerar com `scripts/make-texture.mjs` |
| Logo oficial do Airbnb | seções 7 e 10 | **sim** — baixar do brand kit oficial, não redesenhar |
| Foto do Paulo | seção "Quem cuida da casa" | não — seção fora desta fase |
