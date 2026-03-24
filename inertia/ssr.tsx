import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { Data } from '@generated/data';
import { createInertiaApp } from '@inertiajs/react';
import ReactDOMServer from 'react-dom/server';
import DefaultLayout from '~/layouts/default_layout';

export default function render(page: any) {
	return createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		resolve: (name) => {
			return resolvePageComponent(
				`./pages/${name}.tsx`,
				import.meta.glob('./pages/**/*.tsx', { eager: true }),
				(page: React.ReactElement<Data.SharedProps>) => (
					<DefaultLayout>{page}</DefaultLayout>
				)
			);
		},
		setup: ({ App, props }) => <App {...props} />,
	});
}
