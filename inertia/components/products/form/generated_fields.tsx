import { Box, Button, Divider, Stack, TextInput } from '@mantine/core';

type GeneratedField = {
	label: string;
	url: string;
};

interface GeneratedFieldsProps {
	label: string;
	textLabel: string;
	valueLabel: string;
	value?: GeneratedField[];
	onChange: (value: GeneratedField[]) => void;
}

export function GeneratedFields({
	label,
	textLabel,
	valueLabel,
	value = [],
	onChange,
}: GeneratedFieldsProps) {
	const addField = () => {
		onChange([...value, { label: '', url: '' }]);
	};

	const removeField = (index: number) => {
		const newFields = value.filter((_, i) => i !== index);
		onChange(newFields);
	};

	const handleChange = (
		field: 'label' | 'url',
		newValue: string,
		index: number
	) => {
		const newFields = [...value];
		newFields[index] = {
			...newFields[index],
			[field]: newValue,
		};
		onChange(newFields);
	};

	return (
		<Stack h="100%">
			<Divider label={label} />
			{value.map((field, index) => (
				<Box key={index}>
					<TextInput
						label={textLabel}
						name={textLabel}
						value={field.label}
						placeholder={`Ex: ${textLabel}`}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('label', event.currentTarget.value, index)
						}
						mb={4}
						autoFocus
					/>
					<TextInput
						label={valueLabel}
						name={valueLabel}
						value={field.url}
						placeholder={`Ex: ${valueLabel}`}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
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
