# Copy — Casa Humaitá · PT-BR

Todo texto visível do site está aqui. **Nada de texto inventado.** Se falta uma string, pare e pergunte.
`<em>` marca itálico semântico — deve virar `<em>` no HTML, não `<i>`.

---

## 0 · Global

```
site.name           Casa Humaitá
site.tagline        Búzios · Brasil
site.location       Armação dos Búzios, RJ, Brasil
site.address        Rua Alto do Humaitá, 8 — Armação dos Búzios, RJ
site.instagram      @casa.humaita
site.instagramUrl   https://www.instagram.com/casa.humaita/
site.airbnbUrl      https://www.airbnb.com.br/rooms/765063066075542174
```

**Meta da home**
```
meta.home.title        Casa Humaitá — Casa de alto padrão em Búzios com vista para a baía
meta.home.description  Casa inteira no alto do Morro do Humaitá, em Búzios. Nove hóspedes, quatro suítes com vista para o mar, piscina privativa e a Orla Bardot a dois minutos a pé.
```

---

## 1 · Hero

```
hero.eyebrow      BÚZIOS · BRASIL
hero.title        Casa Humaitá
hero.subtitle     Sua casa no paraíso de Búzios
hero.scroll       Role para descer
hero.counter      00
hero.caption      quatro suítes sobre o mar
hero.captionCta   Conheça a casa
```

**Menu inicial**
```
nav.hero.book     Reserve sua estadia      →  #contato
nav.hero.rooms    Veja os cômodos          →  #ambientes
nav.hero.contact  Nossos contatos          →  #contato
```

**Menu principal** (aparece depois do hero — logo à esquerda, links ao centro)
```
nav.main.house      A casa            →  #ambientes
nav.main.arch       Arquitetura       →  #arquitetura
nav.main.location   Localização       →  #localizacao
nav.main.reviews    Avaliações        →  #avaliacoes
nav.main.buzios     Conheça Búzios    →  #buzios
nav.main.contact    Contato           →  #contato
```

---

## 2 · Manifesto

```
manifesto.text
Sua casa <em>inteira</em> no ponto mais lindo de Búzios.
Sem recepção, sem corredor, sem horário.
<em>Só a vista</em>, do nascer ao pôr do sol.
```

Quebras de linha como acima. Sem título, sem eyebrow, sem botão.

---

## 3 · A ficha

```
facts.guests.value      9
facts.guests.label      HÓSPEDES
facts.suites.value      4
facts.suites.label      SUÍTES
facts.beds.value        6
facts.beds.label        CAMAS
facts.baths.value       5,5
facts.baths.label       BANHEIROS
facts.pool.value        1
facts.pool.label        PISCINA PRIVATIVA
facts.view.value        180°
facts.view.label        DE VISTA PARA O MAR
```

---

## 4 · A régua de ambientes

```
rooms.eyebrow    A CASA
rooms.cursor     ARRASTE
```

**Rótulos dos cards, nesta ordem**
```
rooms.view        A vista
rooms.living      Sala de estar
rooms.kitchen     Cozinha
rooms.master      Suíte principal
rooms.suite1      Suíte 1
rooms.suite2      Suíte 2
rooms.suite3      Suíte 3
rooms.pool        Piscina
rooms.grill       Churrasqueira
rooms.garden      Jardim
rooms.arches      Arcos
```

**Módulo de visualização ampliada**
```
lightbox.close      Fechar
lightbox.prev       Anterior
lightbox.next       Próxima
lightbox.counter    {current} / {total}
```

---

## 5 · Arquitetura

```
arch.display    ARQUITETURA
```

Sem texto de apoio. A palavra e a foto.

---

## 6 · Localização

```
location.eyebrow    BÚZIOS · RIO DE JANEIRO
location.title      Nossa Localização
location.region     ARMAÇÃO DOS BÚZIOS, RJ, BRASIL
location.mapCta     VEJA NO MAPA
```

**Intro** — substitui o texto atual do arquivo de referência
```
location.intro
No coração de Búzios, entre a Orla Bardot e a Rua das Pedras, a Casa Humaitá fica a poucos minutos das praias mais bonitas da península. Toque nos pontos do mapa ou arraste para ver nossos locais.
```

> Nota para o desenvolvedor: "Toque" é a redação aprovada pelo cliente e vale para os dois contextos — no desktop, clicar no pin produz o mesmo resultado. Não criar variação de texto por dispositivo.

**Os 14 lugares — tabela definitiva**

| id | Nome | Minutos | Modo |
|---|---|---|---|
| `orla-bardot` | Orla Bardot | 2 | a pé |
| `praia-do-canto` | Praia do Canto | 8 | a pé |
| `rua-das-pedras` | Rua das Pedras | 8 | a pé |
| `praia-dos-ossos` | Praia dos Ossos | 10 | a pé |
| `praia-da-azeda` | Praia da Azeda | 15 | a pé |
| `joao-fernandes` | João Fernandes | 5 | de carro |
| `praia-do-forno` | Praia do Forno | 5 | de carro |
| `mirante-joao-fernandes` | Mirante de João Fernandes | 8 | de carro |
| `praia-brava` | Praia Brava | 8 | de carro |
| `praia-da-foca` | Praia da Foca | 8 | de carro |
| `praia-da-ferradura` | Praia da Ferradura | 8 | de carro |
| `praia-da-tartaruga` | Praia da Tartaruga | 10 | de carro |
| `porto-da-barra` | Porto da Barra | 12 | de carro |
| `praia-de-geriba` | Praia de Geribá | 15 | de carro |

Coordenadas `x`/`y` e o nó de rota de cada lugar: preservar exatamente os valores do array `PLACES` em `reference/localizacao.html`. **Só os `id` e os dois valores de minutos mudam.**

Unidade exibida no card: `min a pé` ou `min de carro`, em Jost caixa-alta.

---

## 7 · Avaliações

```
reviews.title       Nossas Avaliações
reviews.rating      4,91/5
reviews.count       +40 avaliações
reviews.source      Airbnb
reviews.quoteTitle  O que nossos clientes dizem
reviews.credit      Avaliações publicadas no Airbnb
reviews.creditLink  Ver no Airbnb
```

**Os 10 cards.** Cinco estrelas em todos — os selecionados são todos de 5 estrelas.

```
1 · Alenka — Boca Raton, Flórida — 5 estrelas
Adoramos esta casa. A vista é simplesmente de tirar o fôlego e é, sem dúvida, a melhor parte da propriedade. A casa está muito bem equipada e é perfeita para uma família grande ou um grupo de amigos.

2 · Joan — 9 anos no Airbnb — janeiro de 2026 — 5 estrelas
A Casa Humaitá é uma experiência maravilhosa, não só por sua vista magnífica e seu espaço maravilhoso, mas principalmente pelo Paulo, que está sempre à disposição.

3 · Jezreel — 10 anos no Airbnb — novembro de 2025 — 5 estrelas
Este lugar era absolutamente excepcional, as fotos não fazem jus. As vistas são imaculadas e a localização é fantástica, a apenas cinco minutos a pé de toda a rua principal.

4 · Verna — 7 anos no Airbnb — maio de 2024 — 5 estrelas
Casa maravilhosa, muito melhor do que nas fotos, possui tudo que é preciso para uma estadia confortável. Decoração linda, roupa de cama e banho impecáveis, suítes amplas com linda vista.

5 · Mauro — Cinco Saltos, Argentina — março de 2026 — 5 estrelas
Uma casa incrivelmente linda. A vista e a decoração são um sonho. Tem tudo o que você precisa. Ficamos muito felizes lá.

6 · Erich — Monroe, Nova York — dezembro de 2025 — 5 estrelas
Vista deslumbrante. Quartos confortáveis. Muito espaço. Excelente anfitrião, discreto e gentil.

7 · Micaela — San Carlos de Bariloche, Argentina — novembro de 2025 — 5 estrelas
Uma casa com uma vista incrível. Um lugar altamente recomendado para descansar. Nós voltaremos.

8 · David — Orlando, Flórida — setembro de 2025 — 5 estrelas
O lugar era lindo, com vistas incríveis e ótima localização, realmente acessível a muitos restaurantes e lugares a uma curta distância a pé.

9 · Jessica Franzoni — 5 anos no Airbnb — junho de 2024 — 5 estrelas
A casa mais encantadora que já fiquei. Tem uma das vistas mais lindas de Búzios, vale muito a pena. Localização maravilhosa, dá para ir andando até a Orla Bardot.

10 · Loreto — Santiago, Chile — março de 2026 — 5 estrelas
Tudo foi maravilhoso e a casa era incrível, ótima localização.
```

> Estes textos são dos hóspedes, publicados no Airbnb. Foram encurtados, nunca reescritos. Exibir com crédito e link, uma vez na seção. Não usar foto de rosto.
>
> As palavras "sonho" e "deslumbrante" aparecem nos cards 5 e 6 — são citações de hóspedes, não texto nosso, e por isso não violam o vocabulário proibido. Não editar a fala do hóspede para caber na regra.

---

## 8 · Conheça Búzios

```
buzios.title.line1   Conheça
buzios.title.line2   Búzios
buzios.intro
Explore Búzios com as recomendações de quem mora aqui. Restaurantes, passeios e o jeito certo de aproveitar cada praia.
```

**Cards** — três nesta fase, com link inativo

```
1 · Onde comer em Búzios
   tags: GASTRONOMIA
   contagem: 12 restaurantes
   assinatura: — CASA HUMAITÁ

2 · Qual praia escolher em cada dia
   tags: PRAIAS
   contagem: 9 praias
   assinatura: — CASA HUMAITÁ

3 · O que fazer além da praia
   tags: PASSEIOS
   contagem: 7 passeios
   assinatura: — CASA HUMAITÁ
```

```
buzios.cardCta   Ver guia
```

> Contagem listada, **nunca** contagem de visualizações.
> O botão `+` fica desabilitado com `aria-disabled="true"` — as páginas de guia são fase 2.

---

## 9 · O essencial

```
essentials.title   O essencial
```

```
Check-in            15h às 20h
Checkout            até 12h
Hóspedes            até 9
Animais             bem-vindos
Enxoval             lençóis, toalhas de banho e de praia inclusos e sempre trocados
Internet            Wi-Fi
Climatização        ar-condicionado em todas as suítes
Estacionamento      gratuito, no local
Segurança           câmeras externas e rua com portaria privada
Cozinha             equipada, aberta para a sala
Área de serviço     máquina de lavar, tanque e geladeiras extras
```

---

## 10 · Contato

```
contact.title      Fale com a gente
contact.address    Rua Alto do Humaitá, 8 — Armação dos Búzios, RJ
contact.airbnbCta  Ver no Airbnb
contact.instaCta   @casa.humaita
```

**Reservado, construído e desabilitado**
```
contact.soon.whatsapp   WhatsApp
contact.soon.form.name      Seu nome
contact.soon.form.dates     Datas
contact.soon.form.guests    Número de hóspedes
contact.soon.form.submit    Enviar
```

Nenhum handler. `disabled` em todos os campos e no botão.

---

## 11 · Rodapé

```
footer.address     Rua Alto do Humaitá, 8 — Armação dos Búzios, RJ, Brasil
footer.instagram   Instagram
footer.airbnb      Airbnb
footer.lang.pt     PT
footer.lang.en     EN     (desabilitado)
footer.lang.es     ES     (desabilitado)
footer.credit      Criado por
footer.rights      © 2026 Casa Humaitá
```

`footer.credit` seguido da logo `logo_lp.png`, em corpo pequeno, no canto.

---

## 12 · Acessibilidade — textos alternativos

Toda imagem precisa de `alt` descritivo, escrito para quem não vê a foto. Exemplos do padrão esperado:

```
hero            Vista aérea da Casa Humaitá sobre a Baía da Armação, com escunas ancoradas e as ilhas ao fundo
e-6             Baía de Búzios vista de um dos arcos da varanda, com a piscina e o jardim abaixo
p-1             Piscina com deck de madeira, a churrasqueira coberta ao lado e a baía ao fundo
q-8             Suíte principal com cama de casal e porta aberta para a varanda com vista para o mar
cozinha-1       Cozinha com bancada preta, azulejo azul e balcão de madeira voltado para a sala
b-1             Banheiro da suíte principal com duas pias em mármore e janela para o jardim
```

Para as 57 fotos, escrever no mesmo registro: o que está na imagem, sem adjetivo de venda. `alt` não é lugar de marketing.
