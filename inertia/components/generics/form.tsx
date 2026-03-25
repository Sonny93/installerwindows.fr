import { slugify } from '#shared/utils/index';
import { useForm } from '@inertiajs/react';
import { BASE_INPUT_STYLES, Button } from '@minimalstuff/ui';
import clsx from 'clsx';
import React, { ChangeEvent, FocusEvent, useState } from 'react';

export type Field = {
	label: string;
	name: string;
	description?: string;
	required?: boolean;
	placeholder?: string;
	value?: string;
};

export interface FormProps {
	title: string;
	fields: Field[];
	formUrl: string;
	formMethod?: 'post' | 'put';
}
export function Form({
	title,
	fields,
	formUrl,
	formMethod = 'post',
}: Readonly<FormProps>) {
	const [userHasChangedSlug, setUserHasChangedSlug] = useState<boolean>(false);
	const defaultValues = fields.reduce<Record<string, string>>((acc, field) => {
		acc[field.name] = field.value ?? '';
		return acc;
	}, {});
	const {
		data,
		processing,
		errors,
		isDirty,
		setData,
		setError,
		submit,
		reset,
	} = useForm(defaultValues);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData(e.target.name, e.target.value);
		setError(e.target.name, '');
		if (e.target.name === 'slug') {
			setUserHasChangedSlug(data?.slug !== slugify(e.target.value));
		}
	};

	const handleTitleBlur = (e: FocusEvent<HTMLInputElement>) => {
		if (!userHasChangedSlug) {
			setData('slug', slugify(e.target.value));
		}
	};
	const handleSlugBlur = (e: FocusEvent<HTMLInputElement>) => {
		setData('slug', slugify(e.target.value));
		setUserHasChangedSlug(data?.title !== slugify(e.target.value));
	};

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		submit(formMethod, formUrl);
	};
	const handleReset = () => reset();

	const loading = processing;
	return (
		<form onSubmit={handleSubmit} onReset={handleReset}>
			<div className="flex flex-col gap-4">
				<h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
					{title}
				</h2>
				{fields.map(({ label, description, name, placeholder, required }) => {
					const onBlurTitle = name === 'title' ? handleTitleBlur : undefined;
					const onBlurSlug = name === 'slug' ? handleSlugBlur : undefined;
					const req = required ?? true;
					return (
						<div key={name} className="w-full">
							<label
								htmlFor={name}
								className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								{label}
								{req ? (
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
								value={data[name]}
								onChange={handleChange}
								disabled={loading}
								required={req}
								onBlur={onBlurTitle ?? onBlurSlug}
								className={clsx(
									BASE_INPUT_STYLES,
									'px-3 py-2 text-sm',
									errors[name] &&
										'border-red-500 focus:ring-red-500 dark:border-red-400'
								)}
								aria-invalid={!!errors[name]}
							/>
							{errors[name] ? (
								<p className="mt-1 text-xs text-red-600 dark:text-red-400">
									{errors[name]}
								</p>
							) : null}
						</div>
					);
				})}
				<div className="flex justify-between gap-4">
					<Button variant="subtle" type="reset" disabled={loading || !isDirty}>
						Effacer
					</Button>
					<Button type="submit" loading={loading} disabled={!isDirty}>
						Enregistrer
					</Button>
				</div>
			</div>
		</form>
	);
}
