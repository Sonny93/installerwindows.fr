import {
	KeyboardSize,
	MousePadSpeed,
	PeriphConnectivity,
	PeriphMicrophone,
	PeriphPanel,
	PeriphShape,
	PeriphType,
} from '#shared/types/index';
import { Field } from '~/components/generics/form';

type SelectField = Field & {
	options: { label: string; value: string }[];
};

type BooleanField = Field & {
	type: 'boolean';
};

type NumberField = Field & {
	type: 'number';
};

type TextField = Field & {
	type: 'text';
};

type GeneratedField = Field & {
	type: 'generated';
};

type SelectOrBooleanOrNumberOrTextOrGeneratedField =
	| SelectField
	| BooleanField
	| NumberField
	| TextField
	| GeneratedField;

export const baseProductFields: Field[] = [
	{
		label: 'Marque',
		name: 'brand',
		placeholder: 'Ex: Logitech',
		required: true,
		type: 'text',
	} as TextField,
	{
		label: 'Référence',
		name: 'reference',
		placeholder: 'Ex: G502',
		required: true,
		type: 'text',
	} as TextField,
	{
		label: 'Prix recommandé',
		name: 'recommendedPrice',
		type: 'number',
		placeholder: 'Ex: 100',
		required: true,
	} as NumberField,
	{
		label: 'Informations additionnelles',
		name: 'additionalInfo',
		placeholder: 'Ex: Connectique USB, 7 boutons, etc.',
		type: 'text',
	} as TextField,
	{
		label: 'Liens affiliés',
		name: 'affiliateLinks',
		type: 'generated',
		required: true,
	} as GeneratedField,
	{
		label: 'Avis',
		name: 'reviews',
		type: 'generated',
		required: true,
	} as GeneratedField,
];

export const productSpecificFields: Record<
	string,
	SelectOrBooleanOrNumberOrTextOrGeneratedField[]
> = {
	keyboard: [
		{
			label: 'Taille',
			name: 'size',
			type: 'select',
			placeholder: `Ex: ${KeyboardSize[0]}`,
			options: Object.values(KeyboardSize).map((size) => ({
				label: size,
				value: size,
			})),
			required: true,
		} as SelectField,
		{
			label: 'Switches',
			name: 'switches',
			placeholder: 'Ex: MX Brown',
			required: true,
			type: 'text',
		} as TextField,
	],
	mouse: [
		{
			label: 'Filaire',
			name: 'wire',
			type: 'boolean',
			required: false,
		} as BooleanField,
		{
			label: 'Forme',
			name: 'shape',
			type: 'select',
			options: Object.values(PeriphShape).map((shape) => ({
				label: shape,
				value: shape,
			})),
			placeholder: `Ex: ${PeriphShape[0]}`,
			required: true,
		} as SelectField,
		{
			label: 'Poids (g)',
			name: 'weight',
			placeholder: 'Ex: 100',
			type: 'number',
			required: true,
		} as NumberField,
	],
	mousepad: [
		{
			label: 'Vitesse de glissement',
			name: 'slideSpeed',
			placeholder: `Ex: ${MousePadSpeed[0]}`,
			type: 'select',
			options: Object.values(MousePadSpeed).map((speed) => ({
				label: speed,
				value: speed,
			})),
			required: true,
		} as SelectField,
		{
			label: 'Revêtement',
			name: 'covering',
			type: 'boolean',
			required: false,
		} as BooleanField,
		{
			label: 'Taille (mm)',
			name: 'size',
			placeholder: 'Ex: 400x400',
			type: 'text',
			required: true,
		} as TextField,
	],
	monitor: [
		{
			label: 'Taille (pouces)',
			name: 'size',
			type: 'number',
			required: true,
		} as NumberField,
		{
			label: 'Résolution (px)',
			name: 'resolution',
			placeholder: 'Ex: 1920x1080',
			type: 'text',
			required: true,
		} as TextField,
		{
			label: 'Taux de rafraîchissement (Hz)',
			name: 'refreshRate',
			placeholder: 'Ex: 144',
			type: 'number',
			required: true,
		} as NumberField,
		{
			label: 'Type de panneau',
			name: 'panel',
			placeholder: `Ex: ${PeriphPanel[0]}`,
			type: 'select',
			options: Object.values(PeriphPanel).map((panel) => ({
				label: panel,
				value: panel,
			})),
			required: true,
		} as SelectField,
		{
			label: 'Support VESA',
			name: 'vesaSupport',
			type: 'boolean',
			required: false,
		} as BooleanField,
	],
	headset: [
		{
			label: 'Type',
			name: 'type',
			placeholder: `Ex: ${PeriphType[0]}`,
			type: 'select',
			options: Object.values(PeriphType).map((type) => ({
				label: type,
				value: type,
			})),
			required: true,
		} as SelectField,
		{
			label: 'Connectivité',
			name: 'connectivity',
			placeholder: `Ex: ${PeriphConnectivity[0]}`,
			type: 'select',
			options: Object.values(PeriphConnectivity).map((conn) => ({
				label: conn,
				value: conn,
			})),
			required: true,
		} as SelectField,
		{
			label: 'Microphone',
			name: 'microphone',
			type: 'boolean',
			required: false,
		} as BooleanField,
	],
	earphone: [
		{
			label: 'Filaire',
			name: 'wire',
			type: 'boolean',
			required: false,
		} as BooleanField,
		{
			label: 'Microphone sur fil',
			name: 'microOnWire',
			type: 'boolean',
			required: false,
		} as BooleanField,
	],
	microphone: [
		{
			label: 'Connectivité',
			name: 'connectivity',
			placeholder: `Ex: ${PeriphConnectivity[0]}`,
			type: 'select',
			options: Object.values(PeriphConnectivity).map((conn) => ({
				label: conn,
				value: conn,
			})),
			required: true,
		} as SelectField,
		{
			label: 'Type de microphone',
			name: 'microphoneType',
			placeholder: `Ex: ${PeriphMicrophone[0]}`,
			type: 'select',
			options: Object.values(PeriphMicrophone).map((type) => ({
				label: type,
				value: type,
			})),
			required: true,
		} as SelectField,
	],
};
