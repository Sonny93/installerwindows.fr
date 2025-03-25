import { PeriphPanel } from '#shared/types/index';
import { NumberInput, Select, Stack, Switch, TextInput } from '@mantine/core';
import {
	BaseProductFormData,
	ProductForm,
} from '~/components/products/form/product_form';
import { createFormStore } from '~/stores/form_store';

type MonitorFields = {
	size: number;
	resolution: string;
	refreshRate: number;
	panel: PeriphPanel;
	vesaSupport: boolean;
};

type MonitorFormData = BaseProductFormData & MonitorFields;

const initialData: MonitorFields = {
	size: 24,
	resolution: '1920x1080',
	refreshRate: 60,
	panel: 'IPS',
	vesaSupport: true,
};

const useMonitorFormStore = createFormStore<MonitorFormData>(initialData);

export default function CreateMonitor() {
	const {
		data,
		handleNumberChange,
		handleSelectChange,
		handleTextChange,
		handleBooleanChange,
		setData,
	} = useMonitorFormStore();

	const additionalFields = (
		<Stack gap="xs">
			<NumberInput
				label="Taille (pouces)"
				placeholder="Ex: 24"
				name="size"
				onChange={(value) => handleNumberChange('size', value)}
				value={data.size}
				min={15}
				max={49}
				required
			/>
			<TextInput
				label="Résolution"
				placeholder="Ex: 1920x1080"
				name="resolution"
				onChange={(e) => handleTextChange('resolution', e.target.value)}
				value={data.resolution}
				required
			/>
			<NumberInput
				label="Taux de rafraîchissement (Hz)"
				placeholder="Ex: 60"
				name="refreshRate"
				onChange={(value) => handleNumberChange('refreshRate', value)}
				value={data.refreshRate}
				min={60}
				max={500}
				required
			/>
			<Select
				label="Type de dalle"
				name="panel"
				onChange={(value) => handleSelectChange('panel', value)}
				data={[
					{ label: 'IPS', value: 'IPS' },
					{ label: 'VA', value: 'VA' },
					{ label: 'TN', value: 'TN' },
					{ label: 'OLED', value: 'OLED' },
					{ label: 'QD-OLED', value: 'QD-OLED' },
				]}
				value={data.panel}
				required
			/>
			<Switch
				label="Support VESA"
				name="vesaSupport"
				onChange={(e) =>
					handleBooleanChange('vesaSupport', e.currentTarget.checked)
				}
				checked={data.vesaSupport}
				mt="xs"
			/>
		</Stack>
	);

	return (
		<ProductForm<MonitorFormData>
			title="Ajouter un écran"
			endpoint="/periphs/monitor/create"
			additionalFields={additionalFields}
			initialData={data}
			onDataChange={setData}
		/>
	);
}
