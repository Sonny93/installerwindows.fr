import { ProductType } from '#shared/types/index';
import { Field, Form, FormProps } from '~/components/generics/form';
import { baseProductFields, productSpecificFields } from './product_fields';

interface DynamicProductFormProps extends Omit<FormProps, 'fields'> {
	productType: ProductType;
	initialValues?: Record<string, any>;
	formMethod: 'post' | 'put';
}

export function DynamicProductForm({
	title,
	formUrl,
	productType,
	initialValues,
	formMethod,
	...formProps
}: DynamicProductFormProps) {
	const fields = [...baseProductFields, ...productSpecificFields[productType]];

	// Préparer les valeurs initiales
	const preparedValues = initialValues
		? {
				...initialValues,
				affiliateLinks: initialValues.affiliateLinks || [],
				reviews: initialValues.reviews || [],
			}
		: undefined;

	// Appliquer les valeurs initiales aux champs
	const fieldsWithValues = preparedValues
		? computedFields(fields, preparedValues)
		: fields;

	return (
		<Form
			title={title}
			fields={fieldsWithValues}
			formUrl={formUrl}
			formMethod={formMethod}
			values={preparedValues}
			{...formProps}
		/>
	);
}

const computedFields = (
	fields: Field[],
	value: Record<string, string>
): Field[] =>
	fields.map((field) => ({
		...field,
		value: value[field.name],
	}));
