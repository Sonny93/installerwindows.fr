import { type ChangeEvent } from 'react';
import { Switch } from '@minimalstuff/ui';

interface AutoplayToggleProps {
	isEnabled: boolean;
	onToggle: (isEnabled: boolean) => void;
}

export function AutoplayToggle({
	isEnabled,
	onToggle,
}: Readonly<AutoplayToggleProps>) {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		onToggle(event.currentTarget.checked);
	};

	return (
		<Switch
			checked={isEnabled}
			onChange={handleChange}
			label="Lecture automatique"
			description="Enchaîne sur la vidéo suivante à la fin de celle-ci"
			wrapperClassName="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700"
		/>
	);
}
