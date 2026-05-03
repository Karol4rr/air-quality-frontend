import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/shared/lib/cn';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

export const TooltipProvider = (props: ComponentProps<typeof TooltipPrimitive.Provider>) => {
	return <TooltipPrimitive.Provider {...props} />;
};

type TooltipProps = {
	children: ReactElement;
	content: ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
	contentClassName?: string;
};

export const Tooltip = ({ children, content, side = 'bottom', align = 'center', contentClassName }: TooltipProps) => {
	return (
		<TooltipPrimitive.Root>
			<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Portal>
				<TooltipPrimitive.Content
					side={side}
					align={align}
					sideOffset={6}
					className={cn(
						'z-110 max-w-xs rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-sm leading-snug text-slate-700 shadow-md',
						contentClassName,
					)}
				>
					{content}
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Portal>
		</TooltipPrimitive.Root>
	);
};
