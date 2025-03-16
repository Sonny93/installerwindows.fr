import { AffiliateLink, PeriphShape, Review } from '#shared/types/index';
import { useForm } from '@inertiajs/react';
import {
	Box,
	Button,
	Divider,
	Group,
	NumberInput,
	SegmentedControl,
	Select,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useState } from 'react';

type MouseFormData = {
	brand: string;
	reference: string;
	recommendedPrice: number;
	additionalInfo: string;
	affiliateLinks: AffiliateLink[];
	reviews: Review[];
	wire: boolean;
	shape: PeriphShape;
	weight: number;
};

export default function CreateMouse() {
	const { data, setData, post, errors, processing } = useForm<MouseFormData>({
		brand: '',
		reference: '',
		recommendedPrice: 0,
		additionalInfo: '',
		affiliateLinks: [],
		reviews: [],
		wire: false,
		shape: PeriphShape[0],
		weight: 0,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setData(event.target.name as keyof typeof data, event.target.value);
	};

	const handleNumberChange = (field: string, value: number | string) => {
		setData(field as keyof typeof data, Number(value));
	};

	const handleSelectChange = (field: string, value: string | null) => {
		setData(field as keyof typeof data, value ?? '');
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		post('/periphs/mouse/create');
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{ width: '900px', marginInline: 'auto' }}
		>
			<Title order={2} mb="md">
				Ajouter une souris
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
				<Stack gap={2}>
					<Text>Connectivité</Text>
					<SegmentedControl
						data={[
							{
								label: 'Filaire	',
								value: 'wire',
							},
							{
								label: 'Sans fil',
								value: 'wireless',
							},
						]}
						onChange={(value) => setData('wire', value === 'wire')}
						value={data.wire ? 'wire' : 'wireless'}
						w="200px"
					/>
				</Stack>
				<Select
					label="Forme"
					name="shape"
					onChange={(value) => handleSelectChange('shape', value)}
					data={Object.values(PeriphShape).map((shape) => ({
						label: shape,
						value: shape,
					}))}
					error={errors.shape}
					value={data.shape}
					required
				/>
				<NumberInput
					label="Poids"
					placeholder="Ex: 100"
					name="weight"
					onChange={(value) => handleNumberChange('weight', value)}
					value={data.weight}
					error={errors.weight}
					required
				/>
				<Group grow align="flex-start">
					<FieldGenarator
						label="Liens affiliés"
						textLabel="Nom du site"
						valueLabel="URL"
						onChange={(fields) => setData('affiliateLinks', fields)}
					/>
					<FieldGenarator
						label="Avis"
						textLabel="Titre de la vidéo ou de l'article"
						valueLabel="URL"
						onChange={(fields) => setData('reviews', fields)}
					/>
				</Group>
				<Button type="submit" loading={processing}>
					Créer
				</Button>
			</Stack>
		</form>
	);
}

type Field = {
	label: string;
	url: string;
};
type Fields = Field[];

interface FieldGenaratorProps {
	label: string;
	textLabel: string;
	valueLabel: string;
	onChange: (fields: Fields) => void;
}
function FieldGenarator({
	label,
	textLabel,
	valueLabel,
	onChange,
}: FieldGenaratorProps) {
	const [fields, setFields] = useState<Fields>([]);

	const addField = () => {
		setFields([...fields, { label: '', url: '' }]);
	};

	const removeField = (index: number) => {
		const newFields = fields.filter((_, i) => i !== index);
		setFields(newFields);
		onChange(newFields);
	};

	const handleChange = (field: string, value: string, index: number) => {
		const newFields = [...fields];
		newFields[index] = {
			label: field === 'label' ? value : fields[index].label,
			url: field === 'url' ? value : fields[index].url,
		};
		setFields(newFields);
		onChange(newFields);
	};

	return (
		<Stack h="100%">
			<Divider label={label} />
			{fields.map((field, index) => (
				<Box key={index}>
					<TextInput
						label={textLabel}
						name={textLabel}
						value={field.label}
						placeholder={`Ex: ${textLabel}`}
						onChange={(event) =>
							handleChange('label', event.currentTarget.value, index)
						}
						mb={4}
					/>
					<TextInput
						label={valueLabel}
						name={valueLabel}
						value={field.url}
						placeholder={`Ex: ${valueLabel}`}
						onChange={(event) =>
							handleChange('url', event.currentTarget.value, index)
						}
						mb={4}
					/>
					<Button
						onClick={() => removeField(index)}
						variant="subtle"
						color="red"
						size="xs"
					>
						Supprimer
					</Button>
				</Box>
			))}
			<Button onClick={addField} variant="outline">
				Ajouter un champ
			</Button>
		</Stack>
	);
}
