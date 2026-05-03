import { formatDateTime, isDateDifferent } from '@/shared/lib/formatDate';
import { cn } from '@/shared/lib/cn';

type NoteTimestampsProps = {
	createdAt: string;
	updatedAt: string;
	variant: 'compact' | 'detail';
	className?: string;
};

export const NoteTimestamps = ({ createdAt, updatedAt, variant, className }: NoteTimestampsProps) => {
	const hasSeparateModificationTime = isDateDifferent(createdAt, updatedAt);

	if (variant === 'detail') {
		return (
			<div className={cn('space-y-1', className)}>
				<p className="pl-1 text-sm text-slate-600">
					<span className="font-medium">Dodano: </span>
					{formatDateTime(createdAt)}
				</p>
				{hasSeparateModificationTime ? (
					<p className="pl-1 text-sm text-slate-600">
						<span className="font-medium">Ostatnia modyfikacja: </span>
						{formatDateTime(updatedAt)}
					</p>
				) : null}
			</div>
		);
	}

	return (
		<p className={cn('text-xs text-slate-500', className)}>
			Dodano: {formatDateTime(createdAt)}
			{hasSeparateModificationTime ? ` · Ostatnia modyfikacja: ${formatDateTime(updatedAt)}` : ''}
		</p>
	);
};
