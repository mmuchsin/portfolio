import { describe, expect, it } from 'vitest';
// We test the blog layout's load which calls loadAllBlogPosts.
// Since that reads from the filesystem, we mock fs temporarily.
const module = await import('../routes/[locale]/blog/+layout.server.js');
const load = module.load;

describe('blog layout server load', () => {
	it('returns locale and translations', async () => {
		const event = {
			params: { locale: 'en' },
			parent: async () => ({ locale: 'en', t: {} })
		} as unknown as Parameters<typeof load>[0];
		const result = (await load(event)) as Exclude<Awaited<ReturnType<typeof load>>, void>;
		expect(result.locale).toBe('en');
		expect(result.t).toBeDefined();
	});
});
