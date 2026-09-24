import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { Data } from '@generated/data';
import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react';
import type { ReactElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import { DefaultLayout } from '~/layouts/default_layout';

type InertiaPage = NonNullable<
	NonNullable<Parameters<typeof createInertiaApp>[0]>['page']
>;

export default function render(page: InertiaPage) {
	return createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		resolve: (name) => {
			return resolvePageComponent<ResolvedComponent>(
				`./pages/${name}.tsx`,
				import.meta.glob<ResolvedComponent>('./pages/**/*.tsx', {
					eager: true,
				}),
				(page: ReactElement<Data.SharedProps>) => (
					<DefaultLayout>{page}</DefaultLayout>
				)
			);
		},
		setup: ({ App, props }) => <App {...props} />,
	});
}
