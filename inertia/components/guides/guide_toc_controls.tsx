import { Link, useForm } from '@inertiajs/react';
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

export function GuideTocControls({ slug }: { slug: string }) {
	const { delete: deleteGuide } = useForm();

	const handleDelete = () => {
		modals.openConfirmModal({
			title: 'Supprimer le guide',
			children: (
				<Text size="sm">Êtes-vous sûr de vouloir supprimer le guide ?</Text>
			),
			centered: true,
			labels: { confirm: 'Supprimer', cancel: 'Annuler' },
			confirmProps: { color: 'red' },
			onConfirm: () => deleteGuide(`/guides/${slug}`),
		});
	};

	return (
		<>
			<Button
				variant="light"
				size="xs"
				fullWidth
				component={Link}
				href={`/guides/edit/${slug}`}
			>
				Modifier
			</Button>
			<Button
				variant="light"
				size="xs"
				color="red"
				fullWidth
				onClick={handleDelete}
			>
				Supprimer
			</Button>
		</>
	);
}
