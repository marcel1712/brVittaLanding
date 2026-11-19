# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Landing page provisória (pt-BR) do consultório Vitta Performance do Dr. Bruno Ricardo, em Santo André/SP, enquanto a plataforma real (`brvitta.vercel.app`, Next.js, outro repositório) não é lançada. Objetivo: ser encontrada no Google/Maps e levar o paciente ao WhatsApp, onde a venda acontece. Uma única página estática em Astro, sem framework JS no cliente.

## Comandos

```bash
npm run dev       # http://localhost:4321
npm run build     # gera dist/ (única verificação disponível: não há lint nem testes)
npm run preview
```

Para medir performance use o build (`dist/`), não o `dev`: o servidor de desenvolvimento injeta a barra de debug do Astro e distorce o Lighthouse (54 no dev contra 90 em produção).

## Arquitetura

- [src/config/site.ts](src/config/site.ts) é a fonte única dos dados do negócio: WhatsApp, CRM, endereço, coordenadas, horários, domínio, IDs de analytics, FAQ e `whatsappLink()`. O WhatsApp é um link de mensagem do WhatsApp Business (`wa.me/message/...`): a mensagem inicial é configurada no app, não no código, e o telefone (`whatsapp.number`) só alimenta os dados estruturados. Campos `TODO` ali ainda são estimativas: coordenadas do pino, número de andares do prédio e horários.
- [src/layouts/Base.astro](src/layouts/Base.astro) monta todo o SEO a partir dessa config: meta tags, Open Graph, JSON-LD (`MedicalClinic`, `Physician`, `WebSite`, `FAQPage`), analytics opcional (Google tag / Meta Pixel só carregam se o ID estiver preenchido) e o script que dispara `whatsapp_click`/`Contact` em qualquer link `https://wa.me/` usando o atributo `data-origem`.
- [src/pages/index.astro](src/pages/index.astro) contém todas as seções, o CSS escopado delas e o `<script>` com as interações (ver Animações abaixo). [src/styles/global.css](src/styles/global.css) tem só tokens, tipografia e botões.
- Páginas: `index.astro` (home), `politica-de-privacidade.astro` e `404.astro` (`noindex`, fora do sitemap). Header e footer são componentes ([src/components/SiteHeader.astro](src/components/SiteHeader.astro) e [SiteFooter.astro](src/components/SiteFooter.astro)); fora da home, os links do menu apontam para `/#seção`. `Base.astro` aceita `noindex` e `faq` (o FAQPage do JSON-LD só vai na página que mostra o FAQ). A política de privacidade troca sozinha o trecho de cookies quando `site.analytics` for preenchido: ao ligar o Analytics, revisar o texto e avaliar um aviso de cookies.
- [vercel.json](vercel.json) define cabeçalhos de segurança, incluindo uma **CSP**. Qualquer serviço externo novo (script, imagem, fonte, API) precisa ser liberado ali, senão é bloqueado no ar. Já estão liberados os tiles do OpenFreeMap, o Google Analytics/Tag Manager e o Meta Pixel.
- A imagem de compartilhamento (`public/og-image.jpg`) é gerada por [design/og/gerar-og-image.py](design/og/gerar-og-image.py) com as fontes da marca e o CRM. Rodar de novo se o título, o CRM ou a foto mudarem.
- Performance no celular (medida com Lighthouse): as seções abaixo da dobra usam `content-visibility: auto`, e a classe `.cv-off` (posta por `Base.astro` ao abrir com `#seção` ou clicar num link de seção) desliga isso para os saltos caírem no lugar certo. Nas cápsulas, só a 1ª foto vem com `src`; as outras usam `data-src` e carregam quando o navegador fica ocioso após o `load`. Evite animar `width`, `height`, `top` e afins: anime `transform`, `opacity` ou `clip-path`.
- O FAQ vem de `faqs` em `site.ts` e alimenta tanto a página quanto o JSON-LD, então um texto só precisa ser editado ali.
- O domínio está duplicado em `site.url` (`site.ts`), `site` em [astro.config.mjs](astro.config.mjs) e no `Sitemap:` de [public/robots.txt](public/robots.txt). Os três devem ser mantidos iguais (hoje: `https://www.brvitta.com.br`; o domínio sem `www` redireciona para ele na Vercel, por isso o canônico é o `www`).
- Imagens ficam em `src/assets/` e passam por `<Picture>`/`<Image>` do Astro (AVIF/WebP/JPG). Favicons e `og-image.jpg` estão em `public/`. `design/` guarda os originais e não é usada pelo build.
- As fotos de esporte (`src/assets/obj-*.jpg`, `movimento.jpg`) recebem o tratamento de cor da marca (navy → ardósia → marfim) gerado por [design/fotos/tratamento-de-cor.py](design/fotos/tratamento-de-cor.py) a partir dos originais em `design/fotos/`. As fotos do Dr. Bruno e do consultório ficam **sem filtro**, por decisão do cliente.
- Cápsulas de foto do título (hero): só fotos **nítidas** e recortadas em volta do assunto, geradas por [design/fotos/gerar-capsulas.py](design/fotos/gerar-capsulas.py) a partir dos originais em `design/fotos/`. Fotos desfocadas por movimento viram "borrão" nesse tamanho e já foram rejeitadas pelo cliente. Misturam esporte e saúde clínica. Toda foto precisa ter licença de uso comercial: já foi barrada uma com marca d'água "Unsplash+".
- `public/google70492cdcc1b6272d.html` é o arquivo de verificação do Google Search Console (prova de propriedade do site, não é Analytics). Não apagar. O Google Analytics já está preparado em `Base.astro` e só liga quando `site.analytics.googleTagId` for preenchido com o ID `G-…`.
- Animações: o script em `Base.astro` divide títulos `[data-split]` em palavras e revela `[data-reveal]`/`[data-reveal-img]` com IntersectionObserver (só com `.js` no `<html>`; respeita `prefers-reduced-motion`). Os efeitos ligados à rolagem (faixa de fotos `[data-strip]`, depoimento `[data-scrub]`), as cápsulas de foto do título (`[data-cycle]`) e a lista de objetivos ficam no `<script>` de `index.astro`.
- [src/components/BrandMap.astro](src/components/BrandMap.astro): MapLibre GL + tiles do OpenFreeMap (gratuito, sem chave), recolorido nas cores da marca, com prédios 3D e aproximação animada. Só baixa a biblioteca quando a seção chega perto da tela. O CSS e o worker são importados com `?url` e o worker é registrado via `setWorkerUrl`, porque, com `inlineStylesheets: 'always'` e o bundle, os caminhos padrão do MapLibre 6 quebram. A coordenada vem de `site.address.lat/lng`. O Edifício Works não existe no OpenStreetMap, então é gerado em `BrandMap.astro` a partir de `site.building3d` (uma laje dourada por andar, retângulo alinhado à avenida ou `footprint` exato) e "sobe" andar por andar quando a câmera pousa. O cliente escolheu essa solução em vez do 3D fotográfico do Google, que exigiria chave paga.

## Restrições de conteúdo

- **Sem RQE, o médico não pode se anunciar como especialista** (CFM 2.336/2023). Evite "medicina esportiva/do esporte", "nutrólogo" e similares; o texto fala em atuação em saúde, emagrecimento e performance. Nome e CRM precisam continuar visíveis (hero, seção do médico, rodapé). Não prometer resultado.
- **Não exibir planos nem preços** no site (nem no JSON-LD): valores são tratados no WhatsApp até a plataforma ser lançada.
- **Não linkar a plataforma** (`brvitta.vercel.app`, login etc.) em lugar nenhum do site até ela ser lançada: ainda não está pronta e não deve ter acesso por esta landing.
- Botões de agendamento dizem só **"Agendar"**, sem ícone nem menção visível ao WhatsApp (o paciente descobre ao clicar; há texto `sr-only` para leitores de tela). O texto e as seções vêm do cliente: o Dr. Bruno aparece logo após o hero, como "Dr. Bruno Ricardo" (sem o nome completo nessa seção).
- Já foram rejeitados pelo cliente: o recorte do médico sobre o título no hero, o header em "pílulas" flutuantes e o filtro azul na foto do consultório.
- Identidade visual vem da plataforma: Anek Latin (títulos) e Raleway (texto), preto/navy/ouro (`--gold: #f0ce80`). A arte abstrata da página de login da plataforma **não** faz parte da identidade e não deve ser usada aqui.

## Git

Commits em português seguindo Conventional Commits (`feat:`, `chore:`, `docs:`), pequenos e lógicos. Não adicionar o Claude como coautor. Só fazer commit/push quando o usuário pedir.
