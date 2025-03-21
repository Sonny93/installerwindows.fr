import { PeriphShape } from '#shared/types/index';
import {
	NumberInput,
	SegmentedControl,
	Select,
	Stack,
	Text,
} from '@mantine/core';
import { useState } from 'react';
import {
	BaseProductFormData,
	ProductForm,
} from '~/components/products/form/product_form';

type MouseFormData = BaseProductFormData & {
	wire: boolean;
	shape: PeriphShape;
	weight: number;
};

export default function CreateMouse() {
	const [data, setData] = useState<MouseFormData>({
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

	const handleNumberChange = (
		field: keyof MouseFormData,
		value: number | string
	) => {
		setData({ ...data, [field]: Number(value) });
	};

	const handleSelectChange = (
		field: keyof MouseFormData,
		value: string | null
	) => {
		setData({ ...data, [field]: value ?? '' });
	};

	const additionalFields = (
		<Stack gap={2}>
			<Text>Connectivité</Text>
			<SegmentedControl
				data={[
					{
						label: 'Filaire',
						value: 'wire',
					},
					{
						label: 'Sans fil',
						value: 'wireless',
					},
				]}
				onChange={(value) => setData({ ...data, wire: value === 'wire' })}
				value={data.wire ? 'wire' : 'wireless'}
				w="200px"
			/>
			<Select
				label="Forme"
				name="shape"
				onChange={(value) => handleSelectChange('shape', value)}
				data={Object.values(PeriphShape).map((shape) => ({
					label: shape,
					value: shape,
				}))}
				value={data.shape}
				required
			/>
			<NumberInput
				label="Poids"
				placeholder="Ex: 100"
				name="weight"
				onChange={(value) => handleNumberChange('weight', value)}
				value={data.weight}
				required
			/>
		</Stack>
	);

	return (
		<ProductForm<MouseFormData>
			title="Ajouter une souris"
			endpoint="/periphs/mouse/create"
			additionalFields={additionalFields}
			initialData={data}
			onDataChange={setData}
		/>
	);
}
