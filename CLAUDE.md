# Portfolio

Personal portfolio website for M. Muchsin (Ucin), deployed on GitHub Pages.

## Tech Stack

- SvelteKit + TypeScript (strict mode)
- Static output via `@sveltejs/adapter-static`
- Deployed via GitHub Actions to GitHub Pages
- Bilingual (EN/ID)

## Conventions

- TypeScript strict mode everywhere; no implicit `any`
- Prefer Svelte 5 runes (`$state`, `$derived`, `$effect`) over legacy stores
- Keep site static-export compatible
- Base path: `/portfolio` (GitHub Pages subpath)

## Agent skills

### Issue tracker

Issues live in GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` at root, ADRs in `docs/adr/`. See `docs/agents/domain.md`.
