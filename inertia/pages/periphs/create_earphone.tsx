import { Stack, Switch } from '@mantine/core';
import {
	BaseProductFormData,
	ProductForm,
} from '~/components/products/form/product_form';
import { createFormStore } from '~/stores/form_store';

type EarphoneFields = {
	wire: boolean;
	microOnWire: boolean;
};

type EarphoneFormData = BaseProductFormData & EarphoneFields;

const initialData: EarphoneFields = {
	wire: true,
	microOnWire: true,
};

const useEarphoneFormStore = createFormStore<EarphoneFormData>(initialData);

export default function CreateEarphone() {
	const { data, handleBooleanChange, setData } = useEarphoneFormStore();

	const additionalFields = (
		<Stack gap="xs">
			<Switch
				label="Filaire"
				name="wire"
				onChange={(e) => handleBooleanChange('wire', e.currentTarget.checked)}
				checked={data.wire}
			/>
			<Switch
				label="Microphone sur le fil"
				name="microOnWire"
				onChange={(e) =>
					handleBooleanChange('microOnWire', e.currentTarget.checked)
				}
				checked={data.microOnWire}
			/>
		</Stack>
	);

	return (
		<ProductForm<EarphoneFormData>
			title="Ajouter des écouteurs"
			endpoint="/periphs/earphone/create"
			additionalFields={additionalFields}
			initialData={data}
			onDataChange={setData}
		/>
	);
}
