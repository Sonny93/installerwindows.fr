import { ProductType } from '#shared/types/index';
import { Field, Form, FormProps } from '~/components/generics/form';
import { baseProductFields, productSpecificFields } from './product_fields';

interface DynamicProductFormProps extends Omit<FormProps, 'fields'> {
	productType: ProductType;
	values?: Record<string, string>;
}

export function DynamicProductForm({
	productType,
	values,
	...formProps
}: DynamicProductFormProps) {
	const fields: Field[] = [
		...baseProductFields,
		...(productSpecificFields[productType] || []),
	];

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
