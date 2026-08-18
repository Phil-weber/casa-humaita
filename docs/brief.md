# Brief — Casa Humaitá

## 1. O que é e qual o trabalho da página

Casa Humaitá é uma casa inteira de aluguel por temporada em Armação dos Búzios, RJ — 9 hóspedes, 4 suítes, piscina privativa, vista de 180° para a Baía da Armação. Hoje só opera via Airbnb.

**Trabalho da home:** fazer a pessoa querer a casa e ir falar com o anfitrião. Nada mais.
Nesta fase não há reserva nem formulário funcional. A conversão vive na fase 2.

**Posicionamento:** o endereço, privativo.
O Morro do Humaitá é o trecho mais prestigiado da hotelaria de Búzios — Casas Brancas, Abracadabra e Sailing Hotel estão no mesmo morro, com a mesma baía. A Casa Humaitá compartilha o endereço e oferece o que nenhum deles pode: a casa inteira, sem recepção, sem corredor, sem vizinho de parede.

O site **não** compete como "casa de aluguel em Búzios" — nessa prateleira são centenas de imóveis comparados por diária. Compete como um endereço.

**Tom:** contido. O luxo aparece na escala das fotos, no respiro e na tipografia — nunca no adjetivo. Ver a lista de vocabulário proibido em `CLAUDE.md`.

## 2. Público

Grupos de 6 a 9 pessoas — famílias com filhos adultos, grupos de casais, aniversários. Origem majoritariamente Brasil, com presença real de Argentina, Chile e Estados Unidos (7 das 15 avaliações são de estrangeiros). Alto poder de compra, comparando com pousada boutique e não com pousada simples. Pesquisa no celular, decide no desktop, fecha no WhatsApp.

---

## 3. Tokens

Todas as cores abaixo vêm dos dois arquivos que o cliente já aprovou (`reference/hero.html` e `reference/localizacao.html`). Não são invenção nova — são a consolidação do que já existe.

```
--white        #FFFFFF   fundo das seções claras
--navy         #0b1620   fundo das seções escuras e do rodapé
--blue         #0170B2   azul da marca (extraído da logo)
--blue-hover   #01598e
--ink          #10222e   texto sobre claro
--body         #4a5b66   corpo de texto
--faint        #8fa4b1   legenda, unidade, texto terciário
--border       #dbe7ef   filete
--rail-track   #eef4f8   trilha de scrollbar
```

Sobre escuro: texto `#FFFFFF`, secundário `rgba(255,255,255,.9)`, filete `rgba(255,255,255,.18)`.

**Fundo branco é `#FFFFFF` puro.** Decisão fechada do cliente, não reabrir. A profundidade vem da textura, não de tingir o branco.

### Textura

`public/textures/plaster.png` — tile de 200×200px, grão monocromático, aplicado como `background-image: repeat` a **3% de opacidade** sobre o branco. Referência conceitual: reboco branco de parede — é o material da própria casa.

Gerar com `scripts/make-texture.mjs` (Node, sem dependência externa: escrever PNG de ruído com `zlib` ou usar `sharp` se já estiver no projeto). **Nunca** usar filtro SVG `feTurbulence` em runtime — recalcula por frame e mata o mobile.

### Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display / corpo | **Newsreader** (variável, 200–700 + itálico 200–600) | títulos, corpo, números grandes, rótulos de card |
| Utilidade | **Jost** | caixa-alta com tracking: eyebrow, menu, tags, unidades, botões |

Escala, herdada dos arquivos aprovados:

```
h1 hero      Newsreader 300  clamp(64px, 11vw, 188px)   line-height .92
h2 seção     Newsreader 400  clamp(34px, 3.6vw, 58px)   line-height 1.12  letter-spacing -.01em
display      Newsreader 400  clamp(72px, 14vw, 260px)   (palavra ARQUITETURA)
número       Newsreader 400  74px                        line-height .86
rótulo card  Newsreader 400  19–22px
corpo        Newsreader 400  17px / 1.65
eyebrow      Jost      500   12px  tracking .22em  uppercase
caption      Jost      500   11px  tracking .20em  uppercase
menu         Jost      500   11px  tracking .18em  uppercase   ← nunca abaixo de 11px
```

**Itálico é recurso semântico, não enfeite.** Aplicado só nas palavras que carregam o argumento da frase. Marcado com `<em>` em `docs/copy.md`.

### Geometria

- Raio: **2px** em fotos e cards. Pílulas (tag, botão) `999px`. Nada de raio médio.
- Filete: `1px solid var(--border)`. Em fundo escuro, `rgba(255,255,255,.18)`.
- Container: `max-width 1680px`, padding lateral `56px` desktop / `20px` mobile.
- Respiro vertical entre seções: `clamp(96px, 12vh, 180px)`.

---

## 4. Assinatura da página

**A régua de arraste com parallax dentro do frame** (§7, seção 4). É o único lugar onde a página gasta ousadia. Tudo em volta fica quieto e disciplinado.

---

## 5. Ritmo claro/escuro

O header muda de cor conforme a seção, então cada seção declara `data-tone="light"` ou `"dark"`.

```
0 preloader   claro
1 hero        escuro
2 manifesto   claro
3 ficha       claro
4 régua       claro
5 arquitetura escuro
6 localização claro
7 avaliações  claro
8 conheça     claro
9 essencial   claro
10 contato    escuro
11 rodapé     escuro (navy)
```

---

## 6. Orçamento de efeitos — oito, fechado

**1. Preloader → header, movimento contínuo**
Cortina `#FFFFFF` cobrindo a viewport, logo azul centralizada (`logo-humaita.png`). A cortina desce revelando o hero pelo topo — o céu, que é `RGB(2,115,195)`, praticamente o azul da marca. Simultaneamente a logo sobe, encolhe e assume a posição e a cor da logo branca do header. Um movimento só, sem corte.
Duração total **1,2s**. Conteúdo da home renderiza por baixo desde o primeiro byte — a cortina é overlay, nunca bloqueia render. Uma vez por sessão (`sessionStorage`). Desligado em `prefers-reduced-motion` e para user-agent de crawler.

**2. Lenis, inércia curta**
`lerp: 0.09`. Não usar o padrão da biblioteca, que é longo demais e faz o site parecer pesado. `data-lenis-prevent` em toda régua horizontal.

**3. Hero: pan vertical**
`translate3d` em `<img>` maior que o container, dentro de `overflow:hidden`. Progresso medido pelo `getBoundingClientRect()` do container do hero. Detalhe em §12.

**4. Régua: parallax dentro do frame**
O frame tem tamanho fixo e nunca se move. A imagem tem **125% da altura do frame** e desliza atrás dele conforme o card atravessa a viewport. Deslocamento total **25% da altura do frame**. `translate3d`, `will-change: transform`.

**5. Arquitetura: bloco expandindo**
Seção fixada (`sticky`) por **220vh**. Um bloco único de foto começa recuado (aprox. 46% da largura, centralizado) e cresce até full-bleed conforme o progresso. Quando o progresso passa de `.78`, a palavra `ARQUITETURA` entra em display branco sobre a foto.
Versão de bloco único por decisão do cliente — reduz risco. A versão de dois blocos convergindo (referência Era Residence) fica para depois.

**6. Reveal em cascata**
`IntersectionObserver`, dispara uma vez, `once: true`. Deslocamento de 6px + opacidade. Escalonamento máximo de 60ms entre itens. Nunca em loop, nunca ao rolar de volta.

**7. Cursor customizado**
Pílula seguindo o ponteiro com o texto `ARRASTE`, **somente** dentro das duas réguas (ambientes e localização) e da faixa de avaliações. Em nenhum outro lugar. Ausente em touch.

**8. Header reativo**
Transparente sempre. Cor do texto invertendo conforme `data-tone` da seção sob ele. Some ao rolar para baixo, reaparece ao rolar para cima. Sobre foto, simplesmente não está lá.

Fora dessa lista: nada. Sem tilt 3D, sem partícula, sem gradiente animado, sem máquina de escrever, sem contador subindo.

---

## 7. Seções

### 0 · Preloader — claro
Efeito 1. Sem conteúdo próprio.

### 1 · Hero — escuro
**Porte o layout de `reference/hero.html` fielmente.** É um arquivo aprovado pelo cliente.

Imagem: `hero-casa-humaita.png` (vertical, 1952×2176), pan do céu até a casa ao longo de **340vh**.
Conteúdo: logo branca no canto superior esquerdo (132px) · menu inicial de três links · eyebrow `BÚZIOS · BRASIL` · H1 `Casa Humaitá` · subtítulo em itálico · contador `00` com barra de progresso · `Role para descer` · legenda entrando quando o progresso passa de `.72`.

Menu inicial, três links: `Reserve sua estadia` → `#contato` · `Veja os cômodos` → `#ambientes` · `Nossos contatos` → `#contato`.

Correções obrigatórias em §12.

### 2 · Manifesto — claro
Pausa. Sem foto de ambiente.

Centralizado: `passaro-logo.png` pequeno e discreto no topo (largura ~86px, opacidade ~.5), abaixo o texto em Newsreader `clamp(30px, 3.2vw, 50px)`, `line-height 1.3`, largura máxima 20em, itálico em `inteira` e em `Só a vista`. Respiro generoso acima e abaixo — esta seção só funciona se estiver vazia.

Referência de composição: hotel com a marca pequena sobre o texto serifado centralizado (print aprovado pelo cliente).

### 3 · A ficha — claro
Faixa horizontal, seis itens separados por filete vertical. Cada item: ícone em linha no topo, número em Newsreader, rótulo em Jost caixa-alta abaixo.

`9 hóspedes · 4 suítes · 6 camas · 5,5 banheiros · piscina privativa · vista 180°`

**Ícones:** desenhados à mão em SVG, traço de 1,2px, cor `var(--blue)`, no mesmo registro de gravura do pássaro da logo — linha fina, sensação de bico de pena. **Não usar biblioteca de ícones.** Lucide, Feather e Heroicons têm traço uniforme moderno e vão brigar com a logo. Seis ícones originais, simples: figuras humanas, cama, chave/porta, torneira, água, horizonte.

Em mobile: grade de 2 colunas, mesmos filetes.

### 4 · A régua de ambientes — claro · ASSINATURA
Eyebrow `A CASA` à esquerda com o marcador em pílula. Barra de progresso do arraste à direita. Cursor `ARRASTE`.

**Régua única, sem abas.** 11 cards, arraste horizontal por Pointer Events, inércia curta, navegável por seta do teclado.

**Geometria:** altura do frame **fixa** em `clamp(320px, 46vh, 460px)`. Largura **derivada da proporção nativa da foto** — horizontal 3:2 fica ~1,5× a altura; vertical 3:4 fica ~0,75×. Isso produz um compasso 2:1 alternando pela régua. Legendas de todos os cards na mesma linha de base.

Cada card: frame com a foto (efeito 4) · rótulo em Newsreader 19px abaixo à esquerda · seta `→` em círculo de 26px à direita.

A seta abre o **módulo de visualização ampliada**: overlay em tela cheia, fundo `--navy`, foto grande centralizada, arraste horizontal entre as fotos daquele ambiente, contador `03 / 14`, `Esc` e clique fora fecham, foco preso dentro do overlay enquanto aberto.

Ordem e fotos: ver `docs/assets.md §3`.

### 5 · Arquitetura — escuro
Fundo `--navy`. Foto `e-4`. Efeito 5. Palavra `ARQUITETURA` em display branco.

### 6 · Localização — claro
**Porte de `reference/localizacao.html` fielmente.** Arquivo aprovado pelo cliente.

Estrutura: eyebrow `BÚZIOS · RIO DE JANEIRO` em azul · H2 `Nossa Localização` · parágrafo de intro · à direita `ARMAÇÃO DOS BÚZIOS, RJ, BRASIL` em caption · mapa interativo com 14 pins e rota tracejada animada · botão `VEJA NO MAPA →` · régua horizontal de 14 cards com minutos em Newsreader 74px e revelação da foto por `clip-path: circle()`.

Manter: o grafo de nós da rota, a função `smooth()`, o `clip-path` do card, o pin que centraliza o card correspondente, a animação `revealRoute` e o `trailDrift`.

Correções obrigatórias em §12.

Distâncias definitivas em `docs/copy.md §6`.

### 7 · Avaliações — claro
Bloco superior centralizado: H2 `Nossas Avaliações` · subtítulo com `4,91/5`, logo do Airbnb ao lado, e `+40 avaliações`.

Abaixo, duas colunas: à esquerda, aspas em display, o título `O que nossos clientes dizem`, e os controles (`←` `→` com barra de progresso). À direita, faixa horizontal de 10 cards de avaliação.

Cada card: cinco estrelas · texto da avaliação · nome · origem ou tempo no Airbnb · data. **Sem foto de rosto.** Crédito `Avaliação publicada no Airbnb` com link para o anúncio, uma vez na seção.

Arraste por Pointer Events + botões de seta + teclado.

Logo do Airbnb: usar o asset oficial da marca, sem alterar cor ou proporção.

### 8 · Conheça Búzios — claro
H2 `Conheça Búzios` em duas linhas de display, a segunda em peso mais leve com filete abaixo. À direita, texto curto de intro em Jost caixa-alta.

Abaixo, o layout em zigue-zague: **filete vertical dividindo a página em duas colunas**, e **filetes horizontais desalinhados entre as colunas** — é o desalinhamento que produz o zigue-zague. Cards alternam entre coluna esquerda e direita, os da direita entrando deslocados para baixo.

Cada card: título em Newsreader em três linhas · assinatura `— CASA HUMAITÁ` em Jost com o ano em tom mais claro · tags em pílula (`PRAIAS` · `GASTRONOMIA` · `PASSEIOS`) · à direita a contagem listada (`12 restaurantes`).
**Não exibir contagem de visualizações.** Site novo tem zero; número inventado é falso.

Hover: o card expande levemente e surge um botão circular `+` no canto inferior direito. Em touch, o `+` fica sempre visível.

O `+` aponta para as páginas de guia, que **não** entram nesta fase — deixe as rotas declaradas e o link inativo com `aria-disabled`.

### 9 · O essencial — claro
Lista sóbria, sem grade de ícones. Duas colunas em desktop, uma em mobile, itens separados por filete.

Design a refinar depois do primeiro protótipo — cliente ciente.

### 10 · Contato — escuro
Fundo `--navy`. Visual completo, sem função.

Endereço · Instagram · **botão do Airbnb** · espaço reservado, já construído e desabilitado, para WhatsApp e formulário (nome, datas, número de hóspedes). Nenhum `onSubmit`.

### 11 · Rodapé — navy
Logo branca · endereço · Instagram · link do Airbnb · seletor de idioma com `PT` ativo e `EN`/`ES` visíveis e desabilitados · no canto, em corpo pequeno, `Criado por` seguido de `logo_lp.png` (branca, funciona só sobre escuro).

---

## 8. Rotas

| Rota | Fase |
|---|---|
| `/` | **1** — completa |
| `/a-casa` | **1** — completa. Ficha cômodo a cômodo, comodidades integrais, galeria das 57 fotos. Maior peso de SEO interno. |
| `/buzios` | 2 — rota e layout declarados, conteúdo depois |
| `/avaliacoes` | 2 — as 15 avaliações completas |
| `/contato` | 2 |
| `/politica-de-privacidade` | 2 — obrigatória quando o formulário existir (LGPD) |

**Escopo assumido para o primeiro protótipo:** home inteira, polida, mais roteamento e `/a-casa` preenchida. As demais entram como rota declarada com layout vazio. Se o cliente quiser tudo de uma vez, ele avisa — mas cinco páginas no primeiro prompt entrega cinco páginas medianas em vez de uma excelente.

---

## 9. Arquitetura de idiomas

PT-BR é o único idioma publicado agora. A estrutura já nasce pronta para EN e ES:

- `messages/pt.json` com todas as strings. `en.json` e `es.json` criados vazios.
- Rotas com segmento de locale, `pt` como padrão sem prefixo visível.
- `hreflang` já no `<head>`, apontando só para `pt` enquanto os outros não existirem.
- Zero string em JSX.
- Datas e números formatados por `Intl`, nunca escritos à mão.

Motivo: 7 das 15 avaliações são de hóspedes estrangeiros. Traduzir depois custa uma tarde; refatorar internacionalização depois custa uma semana.

---

## 10. SEO e dados estruturados

- `metadata` por rota, título e descrição vindos de `docs/copy.md`.
- Schema `VacationRental` / `LodgingBusiness` com nome, endereço completo (Rua Alto do Humaitá, 8 — publicação autorizada pelo cliente), geo, capacidade, número de quartos e banheiros, comodidades.
- **Não** marcar `aggregateRating` no schema. A nota é do Airbnb, não coletada por nós; marcar avaliação de terceiro como própria pode violar as diretrizes de review snippet do Google. A nota aparece como texto visível com crédito e link — isso basta e não expõe o site.
- `sitemap.xml` e `robots.txt` gerados.
- Open Graph com uma imagem 1200×630 recortada do hero.
- Nunca publicar calendário de disponibilidade. O endereço completo está no site; indicar quando a casa está vazia é exposição desnecessária.

---

## 11. Assets

Inventário completo, mapeamento por seção e avisos de resolução em `docs/assets.md`.

Resumo do que limita: 37 das 57 fotos estão em 720px de largura e nenhuma passa de 1200px. A única exceção é o hero, em 2730×1536. Isso restringe o tamanho máximo de exibição fora do hero — dimensione os frames para não ultrapassar a resolução nativa. Não faça upscale em build.

Logo disponível apenas em PNG (597×418). O preloader e o header vão usar PNG por ora; deixe o caminho pronto para trocar por SVG sem mexer no layout.

---

## 12. Correções obrigatórias nos arquivos importados

Os dois arquivos em `reference/` foram feitos no Claude Design e aprovados pelo cliente. **Porte o layout fielmente** e aplique exatamente estas correções.

### `reference/hero.html`

1. **Progresso do scroll.** O código calcula `window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)` — o scroll da **página inteira**. Funciona no protótipo isolado, onde a página é só o hero. Com a landing completa abaixo, o pan se espalha por toda a altura do site e o hero praticamente não anda. Trocar por progresso relativo ao `getBoundingClientRect()` do container do hero.
2. **`object-position` → `translate3d`.** Animar `object-position` não é acelerado por GPU e trava no Safari mobile. Usar `<img>` mais alta que o container, com `overflow:hidden` no pai, e transformar.
3. **Links do menu estão em `font-size: 9px`.** Subir para 11px, mantendo o tracking.
4. **Remover `html { scroll-behavior: smooth }`.** Conflita com o Lenis.
5. Manter todo o resto idêntico: escala tipográfica, contador, barra, legenda em `.72`, posição da logo.

### `reference/localizacao.html`

1. **Hover-only → Pointer Events.** Pins e cards usam `onMouseEnter`/`onMouseLeave`; o arraste escuta `mousemove`/`mouseup` na window. No celular nada disso existe: os 14 pins ficam mortos, nenhuma rota aparece, a régua não arrasta. Migrar tudo para Pointer Events. No toque, um toque no pin seleciona, outro desmarca. A régua arrasta por toque.
2. **`data-lenis-prevent` na régua.** Ela é `overflow-x: auto` e vai brigar com o smooth scroll.
3. **Distâncias.** `Rua das Pedras` e `Praia do Canto` estão como 10 min; corrigir para **8 min a pé**. As demais ficam como estão no arquivo. Centro de Búzios permanece fora da lista, por decisão do cliente.
4. **`id` dos lugares não batem com os nomes** (`id:"gorda"` rotulado "Praia do Canto", `id:"ossos"` rotulado "Praia Brava", etc.). **Os nomes estão certos, os `id` estão errados** — renomear os `id` para corresponder aos nomes. Sem isso o código fica impossível de manter.
5. **Etiqueta dos pins usa `Helvetica Neue`.** Trocar para Jost.
6. **Texto de intro** substituído — ver `docs/copy.md §6`. O texto atual tem "orla bardot" minúsculo, dois "bem" seguidos e concordância quebrada.
7. **`style-hover` não é HTML.** É construto do Claude Design. Converter para classe CSS ou variante Tailwind.
8. `mapa.png` está em 1920×1080 e será exibido com até 1680px de largura — levemente mole em retina. Manter por ora; substituir por SVG quando houver.

---

## 13. Fase 2, explicitamente fora de escopo agora

WhatsApp funcional · formulário que monta a mensagem pré-preenchida do WhatsApp · captura e armazenamento de lead · política de privacidade · analytics · toggle dia/noite no hero · seção "Quem cuida da casa" (falta a foto do Paulo) · páginas de guia do `Conheça Búzios` · EN e ES · efeito de dois blocos convergindo na Arquitetura.

Nada disso deve aparecer no primeiro protótipo, nem como esboço.
