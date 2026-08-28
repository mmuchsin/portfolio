import { loadAllBlogPosts } from '$lib/mdx/renderer.js';

export const load = async () => {
	const posts = await loadAllBlogPosts('src/content/blog');
	return { posts };
};
