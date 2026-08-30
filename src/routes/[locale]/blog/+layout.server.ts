import type { LayoutServerLoad } from './$types';
import { loadAllBlogPosts } from '$lib/mdx/renderer.js';
import path from 'node:path';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { locale, t } = await parent();
	const blogDir = path.resolve(process.cwd(), 'src', 'content', 'blog');
	const posts = await loadAllBlogPosts(blogDir);
	return {
		locale,
		t,
		posts
	};
};
