import { PeriphConnectivity, PeriphMicrophone } from '#shared/types/index';
import { Select, Stack } from '@mantine/core';
import {
	BaseProductFormData,
	ProductForm,
} from '~/components/products/form/product_form';
import { createFormStore } from '~/stores/form_store';

type MicrophoneFields = {
	connectivity: PeriphConnectivity;
	microphoneType: PeriphMicrophone;
};

type MicrophoneFormData = BaseProductFormData & MicrophoneFields;

const initialData: MicrophoneFields = {
	connectivity: 'USB',
	microphoneType: 'cardioid',
};

const useMicrophoneFormStore = createFormStore<MicrophoneFormData>(initialData);

export default function CreateMicrophone() {
	const { data, handleSelectChange, setData } = useMicrophoneFormStore();

	const additionalFields = (
		<Stack gap="xs">
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
			<Select
				label="Type de microphone"
				name="microphoneType"
				onChange={(value) => handleSelectChange('microphoneType', value)}
				data={[
					{ label: 'Cardioïde', value: 'cardioid' },
					{ label: 'Omnidirectionnel', value: 'omnidirectional' },
					{ label: 'Stereo', value: 'stereo' },
				]}
				value={data.microphoneType}
				required
			/>
		</Stack>
	);

	return (
		<ProductForm<MicrophoneFormData>
			title="Ajouter un microphone"
			endpoint="/periphs/microphone/create"
			additionalFields={additionalFields}
			initialData={data}
			onDataChange={setData}
		/>
	);
}
