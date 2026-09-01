import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { tick } from 'svelte';
import Header from './Header.svelte';
import type { Dictionary } from '$lib/i18n';

// The Header reads `page` from $app/state for route awareness; bare
// component tests have no SvelteKit router, so provide a controllable one.
const pageMock = vi.hoisted(() => ({
	route: { id: '/[locale]' },
	url: { pathname: '/portfolio/en/' }
}));
vi.mock('$app/state', () => ({ page: pageMock }));

const nav: Dictionary['nav'] = {
	home: 'Home',
	about: 'About',
	projects: 'Projects',
	contact: 'Contact',
	blog: 'Blog'
};

function navLinks(): HTMLAnchorElement[] {
	return Array.from(
		screen.getByRole('navigation', { name: 'Sections' }).querySelectorAll('a')
	);
}

describe('Header', () => {
	it('renders the brand name', () => {
		render(Header, { locale: 'en', nav, setLang: () => {} });
		expect(screen.getByText('Muchsin')).toBeTruthy();
	});

	it('renders all navigation labels in desktop nav', () => {
		render(Header, { locale: 'en', nav, setLang: () => {} });

		const labels = navLinks().map((a) => a.textContent);
		expect(labels).toEqual(Object.values(nav));
	});

	it('links home and blog to routes, sections to home anchors', () => {
		render(Header, { locale: 'en', nav, setLang: () => {} });

		const hrefs = navLinks().map((a) => a.getAttribute('href'));
		expect(hrefs).toEqual([
			'/portfolio/en/',
			'/portfolio/en/#about',
			'/portfolio/en/#projects',
			'/portfolio/en/#contact',
			'/portfolio/en/blog/'
		]);
	});

	it('prefixes section anchors with the active locale', () => {
		render(Header, { locale: 'id', nav, setLang: () => {} });

		const hrefs = navLinks().map((a) => a.getAttribute('href'));
		expect(hrefs[1]).toBe('/portfolio/id/#about');
		expect(hrefs[3]).toBe('/portfolio/id/#contact');
	});

	it('marks home as the current page on initial render', () => {
		pageMock.route.id = '/[locale]';
		render(Header, { locale: 'en', nav, setLang: () => {} });

		expect(navLinks()[0].getAttribute('aria-current')).toBe('page');
		expect(navLinks()[1].getAttribute('aria-current')).toBeNull();
	});

	it('marks a section nav key current on its standalone route', () => {
		pageMock.route.id = '/[locale]/about';
		render(Header, { locale: 'en', nav, setLang: () => {} });

		expect(navLinks()[0].getAttribute('aria-current')).toBeNull();
		expect(navLinks()[1].getAttribute('aria-current')).toBe('page');
		expect(navLinks()[2].getAttribute('aria-current')).toBeNull();
	});

	it('marks blog current on a blog route', () => {
		pageMock.route.id = '/[locale]/blog/[slug]';
		render(Header, { locale: 'en', nav, setLang: () => {} });

		expect(navLinks()[0].getAttribute('aria-current')).toBeNull();
		expect(navLinks()[4].getAttribute('aria-current')).toBe('page');
	});

	it('shows active language button for "en"', () => {
		render(Header, { locale: 'en', nav, setLang: () => {} });

		const enBtn = screen.getByRole('button', { name: 'EN' });
		expect(enBtn.getAttribute('aria-pressed')).toBe('true');
	});

	it('shows active language button for "id"', () => {
		render(Header, { locale: 'id', nav, setLang: () => {} });

		const idBtn = screen.getByRole('button', { name: 'ID' });
		expect(idBtn.getAttribute('aria-pressed')).toBe('true');
	});

	it('hides inactive language button aria-pressed', () => {
		render(Header, { locale: 'id', nav, setLang: () => {} });

		const enBtn = screen.getByRole('button', { name: 'EN' });
		expect(enBtn.getAttribute('aria-pressed')).toBe('false');
	});

	it('calls setLang when language button is clicked', () => {
		const setLang = vi.fn();
		render(Header, { locale: 'en', nav, setLang });

		screen.getByRole('button', { name: 'ID' }).click();
		expect(setLang).toHaveBeenCalledWith('id');
	});

	it('renders hamburger button with correct aria-label', () => {
		render(Header, { locale: 'en', nav, setLang: () => {} });

		expect(screen.getByLabelText('Open menu')).toBeTruthy();
	});

	it('opens the mobile menu on hamburger click', async () => {
		render(Header, { locale: 'en', nav, setLang: () => {} });

		const hamburger = screen.getByLabelText('Open menu');
		expect(screen.queryByRole('navigation', { name: 'Sections mobile' })).toBeNull();

		hamburger.click();
		await tick();
		expect(screen.getByRole('navigation', { name: 'Sections mobile' })).toBeTruthy();
		expect(screen.getByLabelText('Close menu')).toBeTruthy();
		expect(hamburger.getAttribute('aria-expanded')).toBe('true');
	});

	it('closes the mobile menu when a link is clicked', async () => {
		render(Header, { locale: 'en', nav, setLang: () => {} });

		screen.getByLabelText('Open menu').click();
		await tick();

		const mobileNav = screen.getByRole('navigation', { name: 'Sections mobile' });
		mobileNav.querySelector('a')?.click();
		await tick();
		expect(screen.queryByRole('navigation', { name: 'Sections mobile' })).toBeNull();
	});

	it('renders language toggle group with aria-label', () => {
		render(Header, { locale: 'en', nav, setLang: () => {} });

		const langGroup = screen.getByRole('group', { name: 'Language' });
		expect(langGroup).toBeTruthy();
	});
});
