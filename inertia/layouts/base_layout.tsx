import '@minimalstuff/ui/style.css';
import 'virtual:uno.css';

import { usePage } from '@inertiajs/react';
import { PageProps } from '@adonisjs/inertia/types';
import { PropsWithChildren, useState } from 'react';
import { TuyauProvider } from '@adonisjs/inertia/react';
import { IconButton, ModalProvider } from '@minimalstuff/ui';

import { tuyauClient } from '~/lib/tuyau_client';
import { usePageTransition } from '~/hooks/use_page_transition';

export function BaseLayout({ children }: Readonly<PropsWithChildren>) {
	const { props } = usePage<PageProps & { flash: string }>();
	const [opened, setOpened] = useState<boolean>(!!props.flash);

	usePageTransition({
		querySelector: '[data-page-transition]',
		ignorePatterns: [/^\/videos\/[^/]+$/],
	});

	const closeFlash = (): void => setOpened(false);

	return (
		<TuyauProvider client={tuyauClient}>
			{opened && props.flash ? (
				<div
					className="fixed top-4 left-1/2 z-[100] flex max-w-[min(100%-2rem,32rem)] -trangray-x-1/2 items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 shadow-lg dark:border-red-900/50 dark:bg-red-950/90 dark:text-red-200"
					role="alert"
				>
					<span className="flex-1">{props.flash}</span>
					<IconButton
						icon="i-tabler-x"
						aria-label="Fermer"
						variant="ghost"
						size="sm"
						className="shrink-0 text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900/50"
						onClick={closeFlash}
					/>
				</div>
			) : null}
			{children}
			<ModalProvider />
		</TuyauProvider>
	);
}
