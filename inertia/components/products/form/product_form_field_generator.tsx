import { Box, Button, Divider, Stack, TextInput } from '@mantine/core';
import { useState } from 'react';

type Field = {
	label: string;
	url: string;
};
type Fields = Field[];

interface FieldGenaratorProps {
	label: string;
	textLabel: string;
	valueLabel: string;
	onChange: (fields: Fields) => void;
}

export function FieldGenarator({
	label,
	textLabel,
	valueLabel,
	onChange,
}: FieldGenaratorProps) {
	const [fields, setFields] = useState<Fields>([]);

	const addField = () => {
		setFields([...fields, { label: '', url: '' }]);
	};

	const removeField = (index: number) => {
		const newFields = fields.filter((_, i) => i !== index);
		setFields(newFields);
		onChange(newFields);
	};

	const handleChange = (field: string, value: string, index: number) => {
		const newFields = [...fields];
		newFields[index] = {
			label: field === 'label' ? value : fields[index].label,
			url: field === 'url' ? value : fields[index].url,
		};
		setFields(newFields);
		onChange(newFields);
	};

	return (
		<Stack h="100%">
			<Divider label={label} />
			{fields.map((field, index) => (
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
