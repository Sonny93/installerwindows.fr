import { PeriphConnectivity, PeriphType } from '#shared/types/index';
import { Select, Stack, Switch } from '@mantine/core';
import {
	BaseProductFormData,
	ProductForm,
} from '~/components/products/form/product_form';
import { createFormStore } from '~/stores/form_store';

type HeadsetFields = {
	type: PeriphType;
	connectivity: PeriphConnectivity;
	microphone: boolean;
};

type HeadsetFormData = BaseProductFormData & HeadsetFields;

const initialData: HeadsetFields = {
	type: 'open',
	connectivity: 'USB',
	microphone: true,
};

const useHeadsetFormStore = createFormStore<HeadsetFormData>(initialData);
export default function CreateHeadset() {
	const { data, handleSelectChange, handleBooleanChange, setData } =
		useHeadsetFormStore();

	const additionalFields = (
		<Stack gap="xs">
			<Select
				label="Type"
				name="type"
				onChange={(value) => handleSelectChange('type', value)}
				data={[
					{ label: 'Ouvert', value: 'open' },
					{ label: 'Fermé', value: 'closed' },
				]}
				value={data.type}
				required
			/>
			<Select
				label="Connectivité"
				name="connectivity"
				onChange={(value) => handleSelectChange('connectivity', value)}
				data={[
					{ label: 'USB', value: 'USB' },
					{ label: 'Jack', value: 'Jack' },
					{ label: 'Bluetooth', value: 'Bluetooth' },
				]}
				value={data.connectivity}
				required
			/>
			<Switch
				label="Microphone intégré"
				name="microphone"
				onChange={(e) =>
					handleBooleanChange('microphone', e.currentTarget.checked)
				}
				checked={data.microphone}
			/>
		</Stack>
	);

	return (
		<ProductForm<HeadsetFormData>
			title="Ajouter un casque"
			endpoint="/periphs/headset/create"
			additionalFields={additionalFields}
			initialData={data}
			onDataChange={setData}
		/>
	);
}
