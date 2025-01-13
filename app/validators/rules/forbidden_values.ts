import vine from '@vinejs/vine';
import { FieldContext } from '@vinejs/vine/types';

export const forbiddenValues = vine.createRule(
	(currentValue: unknown, forbidenValues: string[], field: FieldContext) => {
		if (
			typeof currentValue === 'string' &&
			forbidenValues.includes(currentValue) &&
			field.isValid
		) {
			field.report(
				`Le champ ${field.name} ne peut pas contenir les valeurs suivantes: ${forbidenValues.join(', ')}`,
				'forbidden_values',
				field
			);
		}
	}
);
