import { PeriphShape } from '#shared/types/index';
import {
	NumberInput,
	SegmentedControl,
	Select,
	Stack,
	Text,
} from '@mantine/core';
import {
	BaseProductFormData,
	ProductForm,
} from '~/components/products/form/product_form';
import { createFormStore } from '~/stores/form_store';

type MouseFields = {
	wire: boolean;
	shape: PeriphShape;
	weight: number;
};
type MouseFormData = BaseProductFormData & MouseFields;

const initialData: MouseFields = {
	wire: false,
	shape: PeriphShape[0],
	weight: 0,
};

const useMouseFormStore = createFormStore<MouseFormData>(initialData);

export default function CreateMouse() {
	const {
		data,
		handleNumberChange,
		handleSelectChange,
		handleBooleanChange,
		setData,
	} = useMouseFormStore();

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
				onChange={(value) => handleBooleanChange('wire', value === 'wire')}
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
