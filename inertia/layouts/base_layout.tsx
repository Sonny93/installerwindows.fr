import { TuyauProvider } from '@adonisjs/inertia/react';
import { PageProps } from '@adonisjs/inertia/types';
import { usePage } from '@inertiajs/react';
import { IconButton, ModalProvider } from '@minimalstuff/ui';
import '@minimalstuff/ui/style.css';
import { PropsWithChildren, useState } from 'react';
import 'virtual:uno.css';
import { usePageTransition } from '~/hooks/use_page_transition';
import { tuyauClient } from '~/lib/tuyau';

export function BaseLayout({ children }: Readonly<PropsWithChildren>) {
	const { props } = usePage<PageProps & { flash: string }>();
	const [opened, setOpened] = useState<boolean>(!!props.flash);

	usePageTransition({
		querySelector: '[data-page-transition]',
		ignorePatterns: [/^\/videos\/[^/]+$/],
	});

	return (
		<TuyauProvider client={tuyauClient}>
			<a
				href="#main-content"
				className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[200] focus-visible:rounded-lg focus-visible:bg-blue-600 focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white focus-visible:shadow-xl"
			>
				Passer au contenu principal
			</a>
			{opened && props.flash ? (
				<div
					className="fixed top-4 left-1/2 z-[100] flex max-w-[min(100%-2rem,32rem)] -translate-x-1/2 items-center gap-3 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/80 px-4 py-3 text-sm text-red-800 dark:text-red-200 shadow-lg dark:shadow-black/40 backdrop-blur-sm"
					role="alert"
				>
					<span className="flex-1">{props.flash}</span>
					<IconButton
						icon="i-tabler-x"
						aria-label="Fermer"
						variant="ghost"
						size="sm"
						className="shrink-0 text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900/50"
						onClick={() => setOpened(false)}
					/>
				</div>
			) : null}
			{children}
			<ModalProvider />
		</TuyauProvider>
	);
}
