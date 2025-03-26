import { KeyboardSize } from '#shared/types/index';
import { Select, Stack, TextInput } from '@mantine/core';
import {
	BaseProductFormData,
	ProductForm,
} from '~/components/products/form/product_form';
import { createFormStore } from '~/stores/form_store';

type KeyboardFields = {
	size: KeyboardSize;
	switches: string;
};

type KeyboardFormData = BaseProductFormData & KeyboardFields;

const useKeyboardFormStore = createFormStore<KeyboardFormData>({
	size: 'full',
});

export default function CreateKeyboard() {
	const { data, handleSelectChange, setData } = useKeyboardFormStore();

	const additionalFields = (
		<Stack gap="xs">
			<Select
				label="Taille"
				name="size"
				onChange={(value) => handleSelectChange('size', value)}
				data={Object.values(KeyboardSize).map((size) => ({
					label: size,
					value: size,
				}))}
				value={data.size}
				required
			/>
			<TextInput
				label="Switches"
				placeholder="Ex: MX Brown"
				name="switches"
				onChange={(event) =>
					handleSelectChange('switches', event.currentTarget.value)
				}
				value={data.switches}
				required
			/>
		</Stack>
	);

	return (
		<ProductForm<KeyboardFormData>
			title="Ajouter un clavier"
			endpoint="/periphs/keyboard/create"
			additionalFields={additionalFields}
			initialData={data}
			onDataChange={setData}
		/>
	);
}
