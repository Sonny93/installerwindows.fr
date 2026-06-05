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
		'inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 transition-colors hover:bg-gray-50 dark:hover:bg-white/8 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

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
