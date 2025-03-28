import { slugify } from '#shared/utils/index';
import { useForm } from '@inertiajs/react';
import {
	Button,
	Group,
	NumberInput,
	Select,
	SimpleGrid,
	Stack,
	Switch,
	TextInput,
	Title,
} from '@mantine/core';
import { ChangeEvent, FocusEvent, FormEvent, useState } from 'react';
import { GeneratedFields } from '~/components/products/form/generated_fields';

export type Field = {
	label: string;
	name: string;
	description?: string;
	required?: boolean;
	placeholder?: string;
	value?: string | { label: string; url: string }[];
	type?: 'text' | 'number' | 'boolean' | 'select' | 'generated';
	options?: { label: string; value: string }[];
	generateSlug?: boolean;
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
	const defaultValues = fields.reduce<
		Record<string, string | number | boolean | { label: string; url: string }[]>
	>((acc, field) => {
		acc[field.name] = field.value ?? (field.type === 'generated' ? [] : '');
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

	const handleNumberChange = (name: string, value: number | string) => {
		setData(name, Number(value));
		setError(name, '');
	};

	const handleSelectChange = (name: string, value: string | null) => {
		setData(name, value ?? '');
		setError(name, '');
	};

	const handleBooleanChange = (name: string, value: boolean) => {
		setData(name, value);
		setError(name, '');
	};

	const handleGeneratedChange = (
		name: string,
		value: { label: string; url: string }[]
	) => {
		setData(name, value);
		setError(name, '');
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

	const handleReset = () => {
		reset();
		setUserHasChangedSlug(false);
	};

	const renderField = (field: Field) => {
		switch (field.type) {
			case 'number':
				return (
					<NumberInput
						key={field.name}
						label={field.label}
						name={field.name}
						placeholder={field.placeholder}
						value={data[field.name] as number}
						onChange={(value) => handleNumberChange(field.name, value)}
						error={errors[field.name]}
						required={field.required}
					/>
				);
			case 'boolean':
				return (
					<Switch
						key={field.name}
						label={field.label}
						checked={data[field.name] as boolean}
						onChange={(event) =>
							handleBooleanChange(field.name, event.currentTarget.checked)
						}
						error={errors[field.name]}
						required={field.required}
					/>
				);
			case 'select':
				return (
					<Select
						key={field.name}
						label={field.label}
						name={field.name}
						placeholder={field.placeholder}
						data={field.options || []}
						value={data[field.name] as string}
						onChange={(value) => handleSelectChange(field.name, value)}
						error={errors[field.name]}
						required={field.required}
					/>
				);
			default:
				return (
					<TextInput
						key={field.name}
						label={field.label}
						name={field.name}
						placeholder={field.placeholder}
						value={data[field.name] as string}
						onChange={handleChange}
						error={errors[field.name]}
						required={field.required}
						onBlur={
							field.generateSlug
								? field.name === 'title'
									? handleTitleBlur
									: field.name === 'slug'
										? handleSlugBlur
										: undefined
								: undefined
						}
					/>
				);
		}
	};

	const renderGeneratedField = (field: Field) => (
		<GeneratedFields
			key={field.name}
			label={field.label}
			textLabel={
				field.name === 'affiliateLinks'
					? 'Nom du site'
					: "Titre de la vidéo ou de l'article"
			}
			valueLabel={field.name === 'affiliateLinks' ? 'URL' : 'URL'}
			value={data[field.name] as { label: string; url: string }[]}
			onChange={(value) => handleGeneratedChange(field.name, value)}
		/>
	);

	const normalFields = fields.filter((field) => field.type !== 'generated');
	const generatedFields = fields.filter((field) => field.type === 'generated');

	return (
		<form
			onSubmit={handleSubmit}
			style={{ width: '900px', maxWidth: '100%', marginInline: 'auto' }}
		>
			<Title order={2} mb="md">
				{title}
			</Title>
			<Stack gap="sm">
				{normalFields.map(renderField)}
				<SimpleGrid cols={2}>
					{generatedFields.map(renderGeneratedField)}
				</SimpleGrid>
				<Group>
					<Button type="submit" loading={processing}>
						Créer
					</Button>
					<Button
						variant="subtle"
						color="red"
						onClick={handleReset}
						disabled={!isDirty || processing}
					>
						Réinitialiser
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
