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
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				aria-label="Fermer"
				onClick={onClose}
			/>
			<div className="absolute top-0 left-0 flex h-full w-[min(100%,20rem)] flex-col bg-white dark:bg-[#0d0d1a] border-r border-gray-100 dark:border-white/5 shadow-2xl dark:shadow-black/50">
				<div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-100 dark:border-white/5 px-4 py-3.5">
					<div className="text-gray-900 dark:text-white">
						{title}
					</div>
					<button
						type="button"
						className="rounded-lg p-1.5 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
						onClick={onClose}
						aria-label="Fermer"
					>
						<span className="i-tabler-x block h-4 w-4" />
					</button>
				</div>
				<div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
			</div>
		</div>,
		document.body
	);
}
