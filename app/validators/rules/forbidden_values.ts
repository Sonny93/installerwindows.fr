import vine from '@vinejs/vine';
import type { FieldContext } from '@vinejs/vine/types';

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

export const rowExists = vine.createRule(
	(currentValue: unknown, field: FieldContext) => {
		if (currentValue === 'new') {
			field.report('La valeur ne peut pas être "new"', 'row_exists', field);
		}
	}
);
