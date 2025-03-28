import { Field, Form, FormProps } from '~/components/generics/form';

const fields: Field[] = [
	{
		label: 'Titre',
		name: 'title',
		placeholder: 'Mon super guide',
		required: true,
	},
	{
		label: 'Lien image',
		description: "Pas de restriction sur la provenance de l'image",
		name: 'thumbnail',
		placeholder: 'https://image.com/image.jpg',
		required: true,
	},
	{
		label: 'Lien Github',
		description:
			'Les domaines github.com ou raw.githubusercontent.com sont acceptés',
		name: 'githubUrl',
		placeholder:
			'https://github.com/Sonny93/installerwindows.fr/blob/main/README.md',
		required: true,
	},
	{
		label: 'Slug personnalisé',
		description: "Ce slug sera utilisé pour l'URL de la page du guide",
		name: 'slug',
		placeholder: 'mon-super-guide',
		required: true,
	},
];

interface GuideFormProps extends Omit<FormProps, 'fields'> {
	values?: Record<string, string>;
}
export function GuideForm({ values, ...formProps }: GuideFormProps) {
	const fieldsWithValues: Field[] = values
		? computedFields(fields, values)
		: fields;
	return <Form {...formProps} fields={fieldsWithValues} />;
}

export const computedFields = (
	fields: Field[],
	value: Record<string, string>
): Field[] =>
	fields.map((field) => ({
		...field,
		value: value[field.name],
	}));
