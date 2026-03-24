import { primaryColor, projectName } from '#config/project';
import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { Data } from '@generated/data';
import { createInertiaApp } from '@inertiajs/react';
import '@mantine/core/styles.css';
import { hydrateRoot } from 'react-dom/client';
import DefaultLayout from '~/layouts/default_layout';
import './css/app.css';

createInertiaApp({
	progress: { color: primaryColor, delay: 100 },

	title: (title) => (title && `${title} — `) + projectName,

	resolve: async (name) => {
		return resolvePageComponent(
			`./pages/${name}.tsx`,
			import.meta.glob('./pages/**/*.tsx'),
			(page: React.ReactElement<Data.SharedProps>) => (
				<DefaultLayout>{page}</DefaultLayout>
			)
		);
	},

	setup({ el, App, props }) {
		hydrateRoot(el, <App {...props} />);
	},
});
