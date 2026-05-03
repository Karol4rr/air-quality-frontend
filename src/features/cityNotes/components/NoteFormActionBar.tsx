import { Button } from '@/shared/ui/Button';
import { cn } from '@/shared/lib/cn';
import DiscardIcon from '@/assets/icons/discard.svg?react';
import SaveIcon from '@/assets/icons/save.svg?react';

type NoteFormActionBarProps = {
	onCancel: () => void;
	isSaving: boolean;
	cancelVariant: 'primary' | 'ghost';
	saveVariant: 'secondary' | 'primary';
};

export const NoteFormActionBar = ({ onCancel, isSaving, cancelVariant, saveVariant }: NoteFormActionBarProps) => {
	return (
		<div className="flex justify-end gap-2 pt-2">
			<Button type="button" variant={cancelVariant} className="gap-2" onClick={onCancel}>
				<DiscardIcon className="h-4 w-4 shrink-0" aria-hidden />
				Anuluj
			</Button>
			<Button type="submit" variant={saveVariant} className="gap-2" disabled={isSaving}>
				<SaveIcon className={cn('h-4 w-4 shrink-0', saveVariant === 'primary' && 'text-white')} aria-hidden />
				{isSaving ? 'Zapisywanie…' : 'Zapisz'}
			</Button>
		</div>
	);
};
