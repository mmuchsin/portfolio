import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { locale, t, posts } = await parent();
	return {
		locale,
		t,
		posts
	};
};
