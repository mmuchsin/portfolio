# Portfolio

Personal portfolio website for Muchsin, deployed on GitHub Pages.

## Tech Stack

- SvelteKit + TypeScript (strict mode)
- Static output via `@sveltejs/adapter-static`
- Deployed via GitHub Actions to GitHub Pages
- Bilingual (EN/ID) via URL-driven locale prefixes (`/en/`, `/id/`) — no store, no localStorage. Root path auto-redirects based on browser language.

## Conventions

- TypeScript strict mode everywhere; no implicit `any`
- Prefer Svelte 5 runes (`$state`, `$derived`, `$effect`) over legacy stores
- Keep site static-export compatible
- Base path: `/portfolio` (GitHub Pages subpath)

## Package Management

**Always use `bun` instead of `npm`, `npx`, `yarn`, or `pnpm` for all package management and script execution in this project.** This applies to every shell command, script, CI step, and agent action — including commands chained with `&&`, `||`, `;`, or piped with `|`. Never fall back to npm/yarn/pnpm even if `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml` exists — delete those lock files if found and use `bun.lock` instead.

### Command mapping

| Instead of | Use |
|---|---|
| `npm install` / `yarn install` / `pnpm install` | `bun install` |
| `npm install <pkg>` / `yarn add <pkg>` | `bun add <pkg>` |
| `npm install -D <pkg>` / `yarn add -D <pkg>` | `bun add -d <pkg>` |
| `npm uninstall <pkg>` / `yarn remove <pkg>` | `bun remove <pkg>` |
| `npx <cmd>` | `bunx <cmd>` |
| `npm run <script>` | `bun run <script>` or `bun <script>` |
| `npm test` | `bun test` |
| `node <file>.js` | `bun <file>.js` |
| `npm ci` | `bun install --frozen-lockfile` |

### Chained commands

Every command in a chain must use `bun`/`bunx` — do not mix `npm` and `bun` in the same chain, and do not let one `npm` step slip in "just this once":

```bash
# ❌ WRONG — mixed, or partially npm
npm install && bun run build
bun install && npm run test
npm install <pkg> && npm run dev

# ✅ CORRECT — bun end to end
bun install && bun run build
bun add <pkg> && bun run dev
bun install && bun run lint && bun run check && bun run test
```

## Agent skills

### Issue tracker

Issues live in GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: `CONTEXT.md` at root, ADRs in `docs/adr/`. See `docs/agents/domain.md`.
