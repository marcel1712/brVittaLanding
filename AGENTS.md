# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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

- [src/config/site.ts](src/config/site.ts) é a fonte única dos dados do negócio: WhatsApp, CRM, endereço, coordenadas, horários, domínio, IDs de analytics, FAQ e `whatsappLink()`. Campos `TODO` ali ainda têm valores de exemplo (CRM `000000`, WhatsApp e endereço fictícios) e precisam ser preenchidos antes de publicar.
- [src/layouts/Base.astro](src/layouts/Base.astro) monta todo o SEO a partir dessa config: meta tags, Open Graph, JSON-LD (`MedicalClinic`, `Physician`, `WebSite`, `FAQPage`), analytics opcional (Google tag / Meta Pixel só carregam se o ID estiver preenchido) e o script que dispara `whatsapp_click`/`Contact` em qualquer link `https://wa.me/` usando o atributo `data-origem`.
- [src/pages/index.astro](src/pages/index.astro) contém todas as seções e o CSS escopado delas, e o script do IntersectionObserver da barra fixa de WhatsApp no mobile. [src/styles/global.css](src/styles/global.css) tem só tokens, tipografia e botões.
- O FAQ vem de `faqs` em `site.ts` e alimenta tanto a página quanto o JSON-LD, então um texto só precisa ser editado ali.
- O domínio está duplicado em `site.url` (`site.ts`), `site` em [astro.config.mjs](astro.config.mjs) e no `Sitemap:` de [public/robots.txt](public/robots.txt). Os três devem ser mantidos iguais (hoje é o placeholder `brvitta.com.br`).
- Imagens ficam em `src/assets/` e passam por `<Picture>` do Astro (AVIF/WebP/JPG). Favicons e `og-image.jpg` estão em `public/`. `design/` guarda os originais da marca e não é usada pelo build.

## Restrições de conteúdo

- **Sem RQE, o médico não pode se anunciar como especialista** (CFM 2.336/2023). Evite "medicina esportiva/do esporte", "nutrólogo" e similares; o texto fala em atuação em saúde, emagrecimento e performance. Nome e CRM precisam continuar visíveis (hero, seção do médico, rodapé). Não prometer resultado.
- **Não exibir planos nem preços** no site (nem no JSON-LD): valores são tratados no WhatsApp até a plataforma ser lançada.
- Identidade visual vem da plataforma: Anek Latin (títulos) e Raleway (texto), preto/navy/ouro (`--gold: #f0ce80`). A arte abstrata da página de login da plataforma **não** faz parte da identidade e não deve ser usada aqui.

## Git

Commits em português seguindo Conventional Commits (`feat:`, `chore:`, `docs:`), pequenos e lógicos. Não adicionar o Codex como coautor. Só fazer commit/push quando o usuário pedir.
