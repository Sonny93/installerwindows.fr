import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type AppDrawerProps = {
	opened: boolean;
	onClose: () => void;
	title: ReactNode;
	children: ReactNode;
	zIndex?: number;
};

export function AppDrawer({
	opened,
	onClose,
	title,
	children,
	zIndex = 50,
}: AppDrawerProps) {
	useEffect(() => {
		if (!opened) return;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [opened, onClose]);

	useEffect(() => {
		if (opened) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [opened]);

	if (!opened) return null;

	return createPortal(
		<div className="fixed inset-0" style={{ zIndex }}>
			<button
				type="button"
				className="absolute inset-0 bg-black/50"
				aria-label="Fermer"
				onClick={onClose}
			/>
			<div className="absolute top-0 left-0 flex h-full w-[min(100%,20rem)] flex-col border-r border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
				<div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
					<div className="font-semibold text-gray-900 dark:text-gray-100">
						{title}
					</div>
					<button
						type="button"
						className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
						onClick={onClose}
						aria-label="Fermer"
					>
						<span className="i-tabler-x block h-5 w-5" />
					</button>
				</div>
				<div className="min-h-0 flex-1 overflow-y-auto p-4">{children}</div>
			</div>
		</div>,
		document.body
	);
}
