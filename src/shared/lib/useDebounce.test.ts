import { useDebounce } from '@/shared/lib/useDebounce';
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('shared -> lib -> useDebounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('returns initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('a', 300));
		expect(result.current).toBe('a');
	});

	it('updates to latest value after delay', () => {
		const { result, rerender } = renderHook(({ v, d }: { v: string; d: number }) => useDebounce(v, d), {
			initialProps: { v: 'a', d: 300 },
		});
		expect(result.current).toBe('a');

		rerender({ v: 'b', d: 300 });
		expect(result.current).toBe('a');

		act(() => {
			vi.advanceTimersByTime(299);
		});
		expect(result.current).toBe('a');

		act(() => {
			vi.advanceTimersByTime(1);
		});
		expect(result.current).toBe('b');
	});

	it('resets timer when value changes rapidly', () => {
		const { result, rerender } = renderHook(({ v }: { v: string }) => useDebounce(v, 300), {
			initialProps: { v: 'x' },
		});

		rerender({ v: 'y' });
		act(() => {
			vi.advanceTimersByTime(200);
		});
		rerender({ v: 'z' });
		act(() => {
			vi.advanceTimersByTime(200);
		});
		expect(result.current).toBe('x');

		act(() => {
			vi.advanceTimersByTime(100);
		});
		expect(result.current).toBe('z');
	});
});
