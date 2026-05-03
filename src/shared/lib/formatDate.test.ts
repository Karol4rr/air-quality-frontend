import { formatDateTime } from '@/shared/lib/formatDate';
import { describe, expect, it } from 'vitest';

describe('shared -> lib -> formatDateTime', () => {
	it('returns -- for invalid date', () => {
		expect(formatDateTime('nie-iso')).toBe('--');
	});
});
