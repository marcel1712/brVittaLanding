# Vitta Performance — site institucional

Landing page provisória do consultório do Dr. Bruno Ricardo (Santo André/SP), enquanto a plataforma não é lançada.
Objetivo: ser encontrada no Google e levar o paciente ao WhatsApp, onde acontece a venda.

**Stack:** [Astro](https://astro.build) gerando HTML estático (sem framework JS no cliente), fontes self-hosted
(Anek Latin + Raleway), imagens AVIF/WebP responsivas, JSON-LD (MedicalClinic, Physician, FAQPage), sitemap.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| WhatsApp, CRM, endereço, horários, domínio, analytics | `src/config/site.ts` |
| Perguntas frequentes | `src/config/site.ts` |
| Textos e seções | `src/pages/index.astro` |
| Meta tags, dados estruturados | `src/layouts/Base.astro` |
| Domínio do sitemap | `astro.config.mjs` e `public/robots.txt` |

## Checklist antes de publicar

- [ ] Preencher os `TODO` restantes de `src/config/site.ts` (coordenadas exatas do pino, andares do prédio, horários, Instagram)
- [ ] Trocar o domínio em `astro.config.mjs`, `public/robots.txt` e `site.url`
- [ ] Deploy na Vercel (importar o repositório — detecta Astro sozinha) e apontar o domínio
- [ ] (Opcional) IDs do Google Ads/GA4 e Meta Pixel em `site.analytics` — os cliques no WhatsApp já disparam evento `whatsapp_click` / `Contact`

## SEO local — o que mais pesa (fora do código)

1. **Perfil da Empresa no Google** (business.google.com): é o que coloca o consultório no Maps.
   Categoria principal "Médico" (ou "Clínica médica"), fotos reais, horários, link para o site, WhatsApp.
2. **Avaliações** no Google: pedir a cada paciente após a consulta.
3. **NAP consistente**: nome, endereço e telefone idênticos no site, no Google, no Instagram e no Doctoralia.
4. **Google Search Console**: verificar o domínio e enviar `https://SEU-DOMINIO/sitemap-index.xml`.

## Publicidade médica (CFM 2.336/2023)

- Nome + CRM visíveis (já no hero, na seção do médico e no rodapé — basta preencher o número).
- Sem RQE, o médico **não pode se anunciar como especialista** (ex.: "médico do esporte", "nutrólogo").
  O texto do site fala em *atuação* em saúde, emagrecimento e performance de propósito.
- Não prometer resultado.
- Preços e planos **não** aparecem no site por decisão do negócio: são tratados no WhatsApp até o lançamento da plataforma.
