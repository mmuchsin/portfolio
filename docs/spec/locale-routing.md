# Spec: Locale-Based Routing (v2)

> Status: implemented. Amended 2026-09-01 — one-page home restored with
> anchor nav (ADR 0008 amendment); standalone section routes remain as
> deep links.

## Goal

Migrate from store-based language filtering (localStorage toggle) to URL-driven locale prefixes (`/en/`, `/id/`). The URL path segment drives all language logic — translations, content filtering, date formatting, document lang attribute.

## ADR Reference

- **ADR 0008** — Locale-based routing replaces client-side language toggle

## Route Structure

```
src/routes/
  +page.svelte                  → Root redirect stub (client-side, browser language)
  +error.svelte                 → 404 page (rendered into 404.html by adapter fallback)
  +layout.server.ts             → Loads blog posts (typed LayoutServerLoad)
  +layout.svelte                → Skip link + slot (unchanged)
  +layout.ts                    → prerender: true (unchanged)

  [locale]/                     → Catch-all route for locale-prefixed paths
    +layout.svelte              → Shared layout: Header (brand, nav, language toggle) + Slot
    +page.svelte                → One-page home: Hero + About + Projects + Contact
    about/+page.svelte          → Deep-link route rendering the About section
    projects/+page.svelte       → Deep-link route rendering the Projects section
    contact/+page.svelte        → Deep-link route rendering the Contact section

    blog/
      +page.server.ts           → Load all posts, filter by locale
      +page.svelte              → Blog index (filtered by URL locale)
      [slug]/
        +page.server.ts         → Load single post, enforce language alignment
        +page.svelte            → Post detail

    blog/tags/[tag]/
      +page.server.ts           → Load posts by tag + locale filter
      +page.svelte              → Tag page (filtered by URL locale)
```

## Root Redirect Logic

- `src/lib/locale.ts` (`resolveLocale`) maps the browser language to
  `en`/`id` with `en` fallback
- Prerendered root stub (`+page.svelte`) redirects client-side on mount;
  a `<noscript>` block links both locales
- Uses `base` from `$app/paths` for the GitHub Pages subpath (`/portfolio`)

## Locale Layout (`[locale]/+layout.svelte`)

- `[locale]/+layout.server.ts` validates `params.locale` (`en`/`id`) and 404s otherwise
- Loads translations based on locale: `translations[locale]`
- Sets `<html lang>` to the active locale (hydration effect)
- Header receives translated nav labels and the language toggle
- Toggle swaps the locale segment in-place in the pathname

## Home Page (`[locale]/+page.svelte`)

- One-page home: Hero + About + Projects + Contact (ADR 0002 pattern)
- Nav and Hero CTAs target section anchors (`/en/#about`)
- Scroll reveals wired per page (ADR 0005)

## Section Pages (`about/`, `projects/`, `contact/`)

- Deep-link routes rendering the same section components
- Their own nav key is marked current (`aria-current="page"`)

## Blog Migration

- Blog index filters posts by URL locale: `posts.filter(p => p.lang === locale)`
- Post detail enforces language alignment: if post.lang !== locale, return 404
- Tag page filters by both tag AND locale
- Dates format based on locale (`id-ID` vs `en-US`)
- No inline EN/ID toggles — only the Header toggle

## Language Toggle

- Single toggle in `[locale]/+layout.svelte` Header
- Shows "EN" / "ID" buttons
- Clicking links to `/en/same-path` or `/id/same-path`
- Active button highlighted with `.active` class
- Removed from: blog layout, blog index, tag page, post detail

## 404 Page

- Custom bilingual 404 for unsupported locales and missing pages
- Shows "Page not found" / "Halaman tidak ditemukan"
- Links back to both `/en/` and `/id/`
- Uses translations from locale if available (fallback to hardcoded text)

## Cleanup

- **Remove `lang-store.ts`** — no longer needed, locale comes from URL
- **Remove `dispatchLangChanged`** from `events.ts` — no more custom events
- **Update `svelte.config.js`** — prerender entries must include locale prefix for all routes
- **Header component** — receives translations as props instead of accepting lang/setLang callbacks

## Translation Keys Added

| Key | EN value | ID value |
|-----|----------|----------|
| `nav.home` | "Home" | "Beranda" |
| `blog_subtitle` | "Learning notes and technical reflections" | "Catatan belajar dan renungan teknis" |
| `tag_heading` | "Posts tagged with " | "Postingan bertanda " |
| `blog_back` | "← Back to Blog" | "← Kembali ke Blog" |

## Translation Keys Removed

- `hero.flip_hint` — unused by Hero.svelte; dropped from the Dictionary and both locale files

## Breaking Changes

- All URLs change: `/blog/hello-world` → `/en/blog/hello-world`
- Existing bookmarks and shared links will break (no redirect configured)
- This is acceptable for a personal portfolio with minimal existing traffic
