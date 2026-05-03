import { Link, Outlet } from 'react-router-dom';
import AirIcon from '@/assets/icons/air.svg?react';
import { animationStyle } from '../styles/animationStyle';
import { cn } from '../lib/cn';

export const AppLayout = () => {
	return (
		<div className="min-h-svh bg-slate-50 text-slate-900">
			<header className="border-b border-slate-200 bg-white">
				<div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
					<Link
						to="/"
						className="group flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-900 hover:underline"
					>
						<AirIcon className={cn('h-4 w-4 shrink-0', animationStyle)} aria-hidden />
						Jakość powietrza
					</Link>
				</div>
			</header>
			<main className="mx-auto max-w-5xl px-4 py-6 text-left">
				<Outlet />
			</main>
		</div>
	);
};
