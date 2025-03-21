import { AffiliateLink, Review } from '#shared/types/index';
import { useForm } from '@inertiajs/react';
import {
	Button,
	Group,
	NumberInput,
	Stack,
	TextInput,
	Title,
} from '@mantine/core';
import { FieldGenarator } from '~/components/products/form/product_form_field_generator';

export type BaseProductFormData = {
	brand: string;
	reference: string;
	recommendedPrice: number;
	additionalInfo: string;
	affiliateLinks: AffiliateLink[];
	reviews: Review[];
};

interface ProductFormProps<T extends BaseProductFormData> {
	title: string;
	endpoint: string;
	additionalFields?: React.ReactNode;
	initialData?: Partial<T>;
	onDataChange?: (data: T) => void;
}

export function ProductForm<T extends BaseProductFormData>({
	title,
	endpoint,
	additionalFields,
	initialData,
	onDataChange,
}: ProductFormProps<T>) {
	const { data, setData, post, errors, processing } = useForm<T>({
		brand: '',
		reference: '',
		recommendedPrice: 0,
		additionalInfo: '',
		affiliateLinks: [],
		reviews: [],
		...initialData,
	} as unknown as T);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newData = { ...data, [event.target.name]: event.target.value };
		setData(event.target.name as keyof T, event.target.value as T[keyof T]);
		onDataChange?.(newData as T);
	};

	const handleNumberChange = (field: keyof T, value: number | string) => {
		const newData = { ...data, [field]: Number(value) };
		setData(field, Number(value) as T[keyof T]);
		onDataChange?.(newData as T);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		post(endpoint);
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{ width: '900px', marginInline: 'auto' }}
		>
			<Title order={2} mb="md">
				{title}
			</Title>
			<Stack gap="sm">
				<TextInput
					label="Marque"
					placeholder="Ex: Logitech"
					name="brand"
					onChange={handleChange}
					value={data.brand}
					required
				/>
				<TextInput
					label="Référence"
					placeholder="Ex: G502"
					name="reference"
					onChange={handleChange}
					value={data.reference}
					error={errors.reference}
					required
				/>
				<NumberInput
					label="Prix recommandé"
					placeholder="Ex: 100"
					name="recommendedPrice"
					onChange={(value) => handleNumberChange('recommendedPrice', value)}
					value={data.recommendedPrice}
					error={errors.recommendedPrice}
					required
				/>
				<TextInput
					label="Informations additionnelles"
					placeholder="Ex: Connectique USB, 7 boutons, etc."
					name="additionalInfo"
					onChange={handleChange}
					value={data.additionalInfo}
					error={errors.additionalInfo}
				/>
				{additionalFields}
				<Group grow align="flex-start">
					<FieldGenarator
						label="Liens affiliés"
						textLabel="Nom du site"
						valueLabel="URL"
						onChange={(fields) => {
							const newData = { ...data, affiliateLinks: fields };
							setData('affiliateLinks', fields as T[keyof T]);
							onDataChange?.(newData as T);
						}}
					/>
					<FieldGenarator
						label="Avis"
						textLabel="Titre de la vidéo ou de l'article"
						valueLabel="URL"
						onChange={(fields) => {
							const newData = { ...data, reviews: fields };
							setData('reviews', fields as T[keyof T]);
							onDataChange?.(newData as T);
						}}
					/>
				</Group>
				<Button type="submit" loading={processing}>
					Créer
				</Button>
			</Stack>
		</form>
	);
}
