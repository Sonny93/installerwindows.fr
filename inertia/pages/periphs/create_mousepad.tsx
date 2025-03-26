import { MousePadSpeed } from '#shared/types/index';
import { Select, Stack, Switch, TextInput } from '@mantine/core';
import {
	BaseProductFormData,
	ProductForm,
} from '~/components/products/form/product_form';
import { createFormStore } from '~/stores/form_store';

type MousePadFields = {
	slideSpeed: MousePadSpeed;
	covering: boolean;
	size: string;
};

type MousePadFormData = BaseProductFormData & MousePadFields;

const initialData: MousePadFields = {
	slideSpeed: 'fast',
	covering: false,
	size: '',
};

const useMousePadFormStore = createFormStore<MousePadFormData>(initialData);

export default function CreateMousePad() {
	const {
		data,
		handleSelectChange,
		handleBooleanChange,
		handleTextChange,
		setData,
	} = useMousePadFormStore();

	const additionalFields = (
		<Stack gap="xs">
			<Select
				label="Vitesse de glissement"
				name="slideSpeed"
				onChange={(value) => handleSelectChange('slideSpeed', value)}
				data={MousePadSpeed.map((speed) => ({
					label: speed,
					value: speed,
				}))}
				value={data.slideSpeed}
				required
			/>
			<Switch
				label="Revêtement"
				name="covering"
				onChange={(event) =>
					handleBooleanChange('covering', event.currentTarget.checked)
				}
				checked={data.covering}
			/>
			<TextInput
				label="Taille"
				name="size"
				onChange={(event) =>
					handleTextChange('size', event.currentTarget.value)
				}
				value={data.size}
				required
			/>
		</Stack>
	);

	return (
		<ProductForm<MousePadFormData>
			title="Ajouter un tapis de souris"
			endpoint="/periphs/mousepad/create"
			additionalFields={additionalFields}
			initialData={data}
			onDataChange={setData}
		/>
	);
}
