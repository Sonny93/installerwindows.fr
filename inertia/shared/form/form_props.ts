import type { Field } from '~/shared/form/field';

export interface FormProps {
	title: string;
	fields: Field[];
	formUrl: string;
	formMethod?: 'post' | 'put';
}
