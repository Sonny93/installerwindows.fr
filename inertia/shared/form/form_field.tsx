import { BASE_INPUT_STYLES } from '@minimalstuff/ui';
import type { ChangeEvent, FocusEvent } from 'react';

import type { Field } from '~/shared/form/field';
import { cn } from '~/shared/lib/cn';

interface FormFieldProps extends Field {
	value: string;
	error?: string;
	disabled: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

export const FormField = ({
	label,
	name,
	description,
	required = true,
	placeholder,
	value,
	error,
	disabled,
	onChange,
	onBlur,
}: Readonly<FormFieldProps>) => (
	<div className="w-full">
		<label
			htmlFor={name}
			className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
		>
			{label}
			{required ? (
				<span className="ml-1 text-red-500 dark:text-red-400">*</span>
			) : null}
		</label>
		{description ? (
			<p className="mb-1 text-xs text-gray-500 dark:text-gray-400">
				{description}
			</p>
		) : null}
		<input
			id={name}
			name={name}
			placeholder={placeholder ?? label}
			value={value}
			onChange={onChange}
			disabled={disabled}
			required={required}
			onBlur={onBlur}
			className={cn(
				BASE_INPUT_STYLES,
				'px-3 py-2 text-sm',
				error && 'border-red-500 focus:ring-red-500 dark:border-red-400'
			)}
			aria-invalid={!!error}
		/>
		{error ? (
			<p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
		) : null}
	</div>
);
