import type { Field } from '~/components/generics/field';

export interface FormProps {
	title: string;
	fields: Field[];
	formUrl: string;
	formMethod?: 'post' | 'put';
}
