import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { describe, expect, it } from 'vitest';

describe('shared -> lib -> getErrorMessage', () => {
	it('returns message from Error', () => {
		expect(getErrorMessage(new Error('abc'))).toBe('abc');
	});

	it('returns string', () => {
		expect(getErrorMessage('x')).toBe('x');
	});

	it('returns default text for unknown type', () => {
		expect(getErrorMessage(null)).toMatch(/nieznany/i);
	});
});
