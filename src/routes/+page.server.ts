import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { resolveLocale } from '$lib/locale';

export const load: PageServerLoad = async ({ request }) => {
	const locale = resolveLocale(request.headers.get('accept-language') ?? undefined);
	redirect(307, `/${locale}/`);
};
