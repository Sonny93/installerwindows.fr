import { Button } from '@minimalstuff/ui';
import { useForm } from '@inertiajs/react';
import React, { ChangeEvent, FocusEvent, useState } from 'react';

import { slugify } from '~/shared/lib/slugify';
import { FormField } from '~/shared/form/form_field';
import type { FormProps } from '~/shared/form/form_props';

function resolveBlurHandler(
	name: string,
	handleTitleBlur: (event: FocusEvent<HTMLInputElement>) => void,
	handleSlugBlur: (event: FocusEvent<HTMLInputElement>) => void
) {
	if (name === 'title') return handleTitleBlur;
	if (name === 'slug') return handleSlugBlur;
	return undefined;
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
				{fields.map((field) => (
					<FormField
						key={field.name}
						{...field}
						value={data[field.name]}
						error={errors[field.name]}
						disabled={loading}
						onChange={handleChange}
						onBlur={resolveBlurHandler(
							field.name,
							handleTitleBlur,
							handleSlugBlur
						)}
					/>
				))}
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
