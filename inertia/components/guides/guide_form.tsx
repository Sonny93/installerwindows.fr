import { Form } from '~/components/generics/form';
import type { Field } from '~/components/generics/field';
import type { FormProps } from '~/components/generics/form_props';

const fields: Field[] = [
	{ label: 'Titre', name: 'title' },
	{
		label: 'Lien image',
		description: "Pas de restriction sur la provenance de l'image",
		name: 'thumbnail',
	},
	{
		label: 'Lien Github',
		description:
			'Les domaines github.com ou raw.githubusercontent.com sont acceptés',
		name: 'githubUrl',
	},
	{
		label: 'Slug personnalisé',
		description: "Ce slug sera utilisé pour l'URL de la page du guide",
		name: 'slug',
		placeholder: 'mon-super-guide',
	},
];

interface GuideFormProps extends Omit<FormProps, 'fields'> {
	values?: Record<string, string>;
}

export function GuideForm({ values, ...formProps }: Readonly<GuideFormProps>) {
	const fieldsWithValues: Field[] = values
		? computedFields(fields, values)
		: fields;
	return <Form {...formProps} fields={fieldsWithValues} />;
}

const computedFields = (
	fields: Field[],
	value: Record<string, string>
): Field[] =>
	fields.map((field) => ({
		...field,
		value: value[field.name],
	}));
