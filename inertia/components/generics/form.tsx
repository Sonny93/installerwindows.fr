import { slugify } from '#shared/utils/index';
import { useForm } from '@inertiajs/react';
import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';

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
}: FormProps) {
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

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submit(formMethod, formUrl);
	};
	const handleReset = () => reset();

	const loading = processing;
	return (
		<form onSubmit={handleSubmit} onReset={handleReset}>
			<Stack>
				<Title order={2}>{title}</Title>
				{fields.map(({ label, description, name, placeholder, required }) => (
					<TextInput
						label={label}
						description={description}
						name={name}
						placeholder={placeholder ?? label}
						value={data[name]}
						onChange={handleChange}
						error={errors[name]}
						key={name}
						disabled={loading}
						required={required ?? true}
						onBlur={
							name === 'title'
								? handleTitleBlur
								: name === 'slug'
									? handleSlugBlur
									: undefined
						}
					/>
				))}
				<Group justify="space-between">
					<Button variant="light" type="reset" disabled={loading || !isDirty}>
						Effacer
					</Button>
					<Button type="submit" loading={loading} disabled={!isDirty}>
						Enregistrer
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
