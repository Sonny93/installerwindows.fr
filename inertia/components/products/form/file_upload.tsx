import { AspectRatio, Box, Image, Stack, Text } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useEffect, useState } from 'react';

interface FileUploadProps {
	label: string;
	name: string;
	onChange: (files: File[]) => void;
	files: File[] | undefined;
	error?: string;
	required?: boolean;
}

export function FileUpload({
	label,
	name,
	onChange,
	error,
	required,
	...props
}: FileUploadProps) {
	const [files, setFiles] = useState<FileWithPath[]>([]);

	useEffect(() => {
		setFiles(props.files ?? []);
	}, [props.files]);

	const handleDrop = (files: FileWithPath[]) => {
		const file = files[0];
		if (file) {
			onChange([file]);
			setFiles([file]);
		}
	};

	return (
		<Stack gap="sm">
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
			</Box>

			{files.length > 0 && <PreviewImage file={files[0]} />}

			{error && (
				<Text size="sm" c="red" mt={4}>
					{error}
				</Text>
			)}
		</Stack>
	);
}

function PreviewImage({ file }: { file: File }) {
	const imageUrl = URL.createObjectURL(file);

	return (
		<AspectRatio ratio={1 / 1} style={{ width: '330px' }}>
			<Image
				src={imageUrl}
				onLoad={() => URL.revokeObjectURL(imageUrl)}
				style={{
					height: '100%',
					width: '100%',
					borderRadius: 'var(--mantine-radius-md)',
				}}
			/>
		</AspectRatio>
	);
}
