---
status: accepted
---

# Locale-based routing replaces client-side language toggle

## Context

ADR 0003 rejected per-locale URLs in v1 because a static subpath site would double build output and complicate anchor links. The decision was: one page, one address, language toggled via localStorage.

The blog feature (v1.2) changed the trade-off calculus. Blog posts have `lang: en/id` frontmatter and are independent content units. With store-based filtering, both locales ship to every visitor and per-language SEO is limited. ADR 0003 explicitly noted this would be revisited if per-locale indexing ever matters.

## Decision

Replace the localStorage-based language toggle with URL-driven locale prefixes:

- `domain.com/en/...` — English content
- `domain.com/id/...` — Indonesian content
- Root path (`domain.com/`) auto-redirects to `/en/` or `/id/` based on browser language
- Unsupported locales return a custom bilingual 404 page
- Blog posts are enforced per-locale via frontmatter `lang` — an English post under `/id/` returns 404

The site uses multi-page sections: About, Projects, and Contact are separate routes (`/en/about`, `/en/projects`, `/en/contact`) with Hero only on the home page. Blog remains multi-page (each post has its own URL).

The `lang-store.ts` store is removed entirely — locale comes from the URL path segment via SvelteKit's `[locale]` catch-all route.

## Consequences

- **SEO:** Each locale has its own URL structure, enabling per-language indexing by search engines
- **Build output:** Doubles HTML files (one per locale), but the site is small (~3 main pages + blog posts) so this is negligible
- **Deep links:** Section URLs are now shareable (`/en/about`) instead of anchor-based (`/#about`)
- **Navigation:** Nav links go to different routes, not anchors. Hero appears only on home page — About/Projects/Contact start directly with their content.
- **Language toggle:** Simplified to one toggle in the shared Header, linking `/en/path` ↔ `/id/path`
- **Breaking change:** All existing URLs change. GitHub Pages links like `domain.com/blog/hello-world` become `domain.com/en/blog/hello-world`. A redirect from old paths may be needed if there's existing traffic.
- **Supersedes ADR 0003** (Bilingual i18n toggle).
