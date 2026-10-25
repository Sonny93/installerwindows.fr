import { useId } from 'react';

type FieldProps = {
	label: string;
	children: React.ReactNode;
};

export const Field = ({ label, children }: Readonly<FieldProps>) => {
	const fieldHeadingId = useId();

	return (
		<section aria-labelledby={fieldHeadingId} className="flex flex-col gap-1">
			<h2
				id={fieldHeadingId}
				className="text-lg font-medium tracking-wide text-gray-800 dark:text-white"
			>
				{label}
			</h2>
			<div className="flex flex-row items-center flex-wrap gap-x-8 gap-y-2">
				{children}
			</div>
		</section>
	);
};
