import { Link } from '@adonisjs/inertia/react';
import { useForm } from '@inertiajs/react';
import { Button, useModalStore } from '@minimalstuff/ui';

interface GuideTocControlsProps {
	slug: string;
}

export function GuideTocControls({ slug }: Readonly<GuideTocControlsProps>) {
	const { delete: deleteGuide } = useForm();

	const handleDelete = () => {
		useModalStore.getState().openConfirm({
			title: 'Supprimer le guide',
			children: (
				<p className="text-sm">Êtes-vous sûr de vouloir supprimer le guide ?</p>
			),
			confirmLabel: 'Supprimer',
			cancelLabel: 'Annuler',
			confirmColor: 'red',
			onConfirm: () => {
				deleteGuide(`/guides/${slug}`);
			},
		});
	};

	const btnOutline =
		'inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:focus:ring-offset-gray-900';

	return (
		<>
			<Link href={`/guides/edit/${slug}`} className={btnOutline}>
				Modifier
			</Link>
			<Button variant="danger" size="sm" fullWidth onClick={handleDelete}>
				Supprimer
			</Button>
		</>
	);
}
