import { useForm } from '@inertiajs/react';
import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { ChangeEvent, FormEvent } from 'react';

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
