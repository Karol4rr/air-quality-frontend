import { ToastContext } from '@/shared/ui/Toast/toastContext';
import { useContext } from 'react';
import type { ToastApi } from './toastContext';

export const useToast = (): ToastApi => {
	const ctx = useContext(ToastContext);
	if (!ctx) {
		throw new Error('useToast musi być używany wewnątrz ToastProvider.');
	}
	return ctx;
};
