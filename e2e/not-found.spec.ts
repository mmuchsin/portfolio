import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:4173/portfolio';

test.describe('Not found handling', () => {
	test('unsupported locale returns 404', async ({ page }) => {
		await page.goto(`${BASE}/fr/`);

		expect(page.url()).toBe(`${BASE}/fr/`);
		const heading = page.locator('h1');
		expect(heading).toContainText('404');
	});

	test('non-existent page returns 404', async ({ page }) => {
		await page.goto(`${BASE}/en/nonexistent-page`);

		expect(page.url()).toBe(`${BASE}/en/nonexistent-page`);
		const heading = page.locator('h1');
		expect(heading).toContainText('404');
	});
});
