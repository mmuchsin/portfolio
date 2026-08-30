import { describe, expect, it } from 'vitest';
import { resolveLocale, SUPPORTED_LOCALES } from './locale';

describe('resolveLocale', () => {
	it('returns en for English browser languages', () => {
		expect(resolveLocale('en')).toBe('en');
		expect(resolveLocale('en-US')).toBe('en');
		expect(resolveLocale('en-GB')).toBe('en');
		expect(resolveLocale('en-AU')).toBe('en');
	});

	it('returns id for Indonesian browser languages', () => {
		expect(resolveLocale('id')).toBe('id');
		expect(resolveLocale('id-ID')).toBe('id');
	});

	it('defaults to en for unknown locales', () => {
		expect(resolveLocale('fr')).toBe('en');
		expect(resolveLocale('de')).toBe('en');
		expect(resolveLocale('ja')).toBe('en');
		expect(resolveLocale('pt-BR')).toBe('en');
	});

	it('defaults to en when no language header is provided', () => {
		expect(resolveLocale(undefined)).toBe('en');
		expect(resolveLocale('')).toBe('en');
	});

	it('only supports en and id in the locale list', () => {
		expect(SUPPORTED_LOCALES).toEqual(['en', 'id']);
	});
});
