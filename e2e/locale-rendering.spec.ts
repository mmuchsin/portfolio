import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 720 } });

test.describe('Locale rendering', () => {
	test('/en/ renders English content', async ({ page }) => {
		await page.goto('/portfolio/en/');

		// Hero section should be present
		expect(await page.locator('h1').textContent()).toContain('Muchsin');

		// Navigation should have English labels (desktop nav visible at 1280px)
		const navLinks = page.locator('.site-nav a');
		expect(await navLinks.count()).toBeGreaterThan(0);

		// First link should be Home (English)
		const firstLinkText = await page.locator('.site-nav a').first().textContent();
		expect(firstLinkText.trim()).toBe('Home');
	});

	test('/id/ renders Indonesian content', async ({ page }) => {
		await page.goto('/portfolio/id/');

		// Hero section should be present
		expect(await page.locator('h1').textContent()).toContain('Muchsin');

		// Navigation should have Indonesian labels
		const navLinks = page.locator('.site-nav a');
		const texts = await navLinks.allTextContents();
		expect(texts.some(t => t.trim() === 'Beranda')).toBeTruthy();
	});

	test('language toggle buttons are visible', async ({ page }) => {
		await page.goto('/portfolio/en/');

		// EN button should be active (has .active class)
		const enBtn = page.locator('.lang-toggle button.active');
		expect(await enBtn.textContent()).toBe('EN');

		// ID button should not have .active class
		const idBtn = page.locator('.lang-toggle button:not(.active)');
		expect(await idBtn.textContent()).toBe('ID');
	});

	test('language toggle switches between locales', async ({ page }) => {
		await page.goto('/portfolio/en/');
		expect(page.url()).toContain('/portfolio/en/');

		// Click the Indonesian language button (the one without .active)
		await page.locator('.lang-toggle button:has-text("ID")').click();

		// Should redirect to Indonesian version
		await page.waitForURL('http://localhost:4173/portfolio/id/**');
		expect(page.url()).toMatch(/\/portfolio\/id(\/.*)?$/);
	});

	test('language toggle switches back to English', async ({ page }) => {
		await page.goto('/portfolio/id/');
		expect(page.url()).toContain('/portfolio/id/');

		// Click the English language button
		await page.locator('.lang-toggle button:has-text("EN")').click();

		// Should redirect to English version
		await page.waitForURL('http://localhost:4173/portfolio/en/**');
		expect(page.url()).toBe('http://localhost:4173/portfolio/en/');
	});
});
