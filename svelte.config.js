import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import fs from 'node:fs';
import path from 'node:path';

// Dynamically discover blog slugs and tags for prerendering.
// This avoids hardcoding entries in svelte.config.js — new posts
// are automatically included without config changes.
function discoverBlogEntries() {
	const entries = [];
	const locales = ['en', 'id'];

	// Root redirect page
	entries.push('/');

	// Main site pages (locale-prefixed)
	for (const locale of locales) {
		entries.push(`/${locale}/`);
		entries.push(`/${locale}/about`);
		entries.push(`/${locale}/projects`);
		entries.push(`/${locale}/contact`);
		entries.push(`/${locale}/blog`);
	}

	const blogDir = path.resolve('src/content/blog');

	try {
		const dirs = fs.readdirSync(blogDir, { withFileTypes: true })
			.filter(d => d.isDirectory());

		for (const dir of dirs) {
			// Individual posts per locale
			for (const locale of locales) {
				entries.push(`/${locale}/blog/${dir.name}`);
			}

			// Read frontmatter to discover tags
			const indexFile = path.join(blogDir, dir.name, 'index.mdx');
			if (!fs.existsSync(indexFile)) continue;

			const content = fs.readFileSync(indexFile, 'utf-8');
			const tagsMatch = content.match(/^tags:\s*\[([^\]]+)\]/m);
			if (tagsMatch) {
				const tags = tagsMatch[1]
					.replace(/[\[\]"]/g, '')
					.split(',')
					.map(t => t.trim());
				for (const tag of tags) {
					// Tag pages per locale
					for (const locale of locales) {
						entries.push(`/${locale}/blog/tags/${tag}`);
					}
				}
			}
		}
	} catch {
		// Blog content directory doesn't exist yet — entries stays minimal.
	}

	return entries;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Parameterized blog routes ([slug], [tag]) are prerendered via
			// explicit entries discovered from the content directory, so
			// strict mode is satisfied. The fallback renders +error.svelte
			// into build/404.html so GitHub Pages serves our full 404 page
			// (with app shell) for unknown paths instead of its stub.
			strict: true,
			fallback: '404.html'
		}),
		// GitHub Pages subpath (ADR 0001)
		paths: {
			base: '/portfolio'
		},
		// Discover blog routes dynamically so new posts/tags are
		// automatically prerendered without config changes.
		prerender: {
			entries: discoverBlogEntries(),
			handleUnseenRoutes: 'warn',
			handleMissingId: 'ignore'
		}
	}
};

export default config;
