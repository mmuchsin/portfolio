# CONTEXT.md — Portfolio Project

## Project
Personal portfolio website for **M. Muchsin (Ucin)**, deployed on GitHub Pages.

## Glossary

| Term | Definition |
|------|------------|
| **Ucin** | Preferred name for M. Muchsin; used in bio, hero, contact |
| **Santri** | Islamic student/scholar background; expertise in classical Arabic grammar (*nahwu*) and Pegon script |
| **Pegon** | Javanese script for writing Arabic-script languages; core of Pegonku project |
| **Nahwu** | Classical Arabic grammar; part of Ucin's scholarly background |
| **Kitab** | Classical Islamic texts; domain of translation tracker project |
| **RAG** | Retrieval-Augmented Generation; thesis research area |
| **TQA** | Thesis Question Answering dataset; thesis playground project |
| **HPC** | High-Performance Computing; UNNES cluster used for thesis work |

## Current State

- Repo: `mmuchsin/portfolio` (public)
- Issue tracker: GitHub Issues with 5 canonical triage labels
- Tech stack: SvelteKit + TypeScript (strict) + Svelte 5 runes + `@sveltejs/adapter-static`
- Deploy: GitHub Pages via GitHub Actions (`base: '/portfolio'`)
- Design: Clean dark theme, typographic, warm accent
- Bilingual: EN/ID with language toggle
- Structure: Single-page (Hero, About, Projects, Contact)

## Projects to Showcase

1. **Pegonku** — Pegon transliteration engine (Nuxt + Python)
   - Live: `https://kitabku.netlify.app`
   - Repo: Public (Nuxt frontend + Python backend)
   - Tags: Nuxt, Python, NLP, Pegon, Transliteration

2. **Pemuda Inklusi** — Community platform (Vue/Nuxt)
   - Live: `https://pemudainklusi.org`
   - Repo: Private
   - Tags: Vue, Nuxt, Community Platform

3. **Tokodifabel** — E-commerce client site (WordPress/WooCommerce)
   - Live: `https://tokodifabel.com`
   - Repo: None (WordPress)
   - Tags: WordPress, WooCommerce, Freelance, GSAP

4. **TQA RAG Playground** — Master's thesis prep (RAG pipeline on UNNES HPC)
   - Live: None (local/HPC)
   - Repo: `mmuchsin/tqa-rag` (public)
   - Tags: Python, RAG, HPC, UNNES, Thesis Research

## Key Decisions (ADR references)

- ADR 0001: SvelteKit + adapter-static for GitHub Pages
- ADR 0002: Single-page layout with 4 sections
- ADR 0003: Bilingual i18n with EN/ID toggle
- ADR 0004: Dark typographic design with warm accent

## Open Questions

- Custom domain (future)
- Blog section (future)
- CV/Resume page (future)