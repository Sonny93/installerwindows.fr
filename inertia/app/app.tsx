/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { projectName } from '#config/project';
import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { createInertiaApp } from '@inertiajs/react';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import { hydrateRoot } from 'react-dom/client';
import DefaultLayout from '~/layouts/default_layout';
import '../css/app.css';

createInertiaApp({
	progress: { color: '#5468FF' },

	title: (title) => (title && `${title} — `) + projectName,

	resolve: async (name) => {
		const currentPage: any = await resolvePageComponent(
			`../pages/${name}.tsx`,
			import.meta.glob('../pages/**/*.tsx')
		);

		currentPage.default.layout =
			currentPage.default.layout ||
			((p: any) => <DefaultLayout children={p} />);

		return currentPage;
	},

	setup({ el, App, props }) {
		hydrateRoot(el, <App {...props} />);
	},
});
