import './css/app.css';

import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import type { Data } from '@generated/data';
import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react';
import type { ReactElement } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { DefaultLayout } from '~/layouts/default_layout';
import { PRIMAY_COLOR, PROJECT_NAME } from '~/shared/consts/project';

void createInertiaApp({
	progress: { color: PRIMAY_COLOR, delay: 100 },

	title: (title) => (title && `${title} — `) + PROJECT_NAME,

	resolve: async (name) => {
		return resolvePageComponent<ResolvedComponent>(
			`./pages/${name}.tsx`,
			import.meta.glob<ResolvedComponent>('./pages/**/*.tsx'),
			(page: ReactElement<Data.SharedProps>) => (
				<DefaultLayout>{page}</DefaultLayout>
			)
		);
	},

	setup({ el, App, props }) {
		hydrateRoot(el, <App {...props} />);
	},
});
