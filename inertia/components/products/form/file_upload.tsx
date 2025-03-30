import { Box, Image, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';

interface FileUploadProps {
	label: string;
	name: string;
	onChange: (file: File | null) => void;
	error?: string;
	required?: boolean;
}

export function FileUpload({
	label,
	name,
	onChange,
	error,
	required,
}: FileUploadProps) {
	const [files, setFiles] = useState<FileWithPath[]>([]);

	const handleDrop = (files: FileWithPath[]) => {
		const file = files[0];
		if (file) {
			onChange(file);
			setFiles([file]);
		}
	};

	return (
		<Box>
			<Text size="sm" fw={500} mb={4}>
				{label}
				{required && <span style={{ color: 'red' }}> *</span>}
			</Text>
			<Dropzone
				accept={IMAGE_MIME_TYPE}
				onDrop={handleDrop}
				maxSize={5 * 1024 ** 2}
				multiple={false}
				name={name}
			>
				<Text ta="center">
					Glissez-déposez une image ici ou cliquez pour sélectionner
				</Text>
			</Dropzone>

			{files.length > 0 && <PreviewImage file={files[0]} />}

			{error && (
				<Text size="sm" c="red" mt={4}>
					{error}
				</Text>
			)}
		</Box>
	);
}

function PreviewImage({ file }: { file: File }) {
	const imageUrl = URL.createObjectURL(file);
	return (
		<Image
			src={imageUrl}
			onLoad={() => URL.revokeObjectURL(imageUrl)}
			style={{ maxWidth: '100%', maxHeight: '200px' }}
		/>
	);
}
