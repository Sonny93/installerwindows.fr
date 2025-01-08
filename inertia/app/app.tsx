/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { projectName } from '#config/project';
import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { createInertiaApp } from '@inertiajs/react';
import { hydrateRoot } from 'react-dom/client';
import '../css/app.css';

createInertiaApp({
	progress: { color: '#5468FF' },

	title: (title) => (title && `${title} — `) + projectName,

	resolve: (name) => {
		return resolvePageComponent(
			`../pages/${name}.tsx`,
			import.meta.glob('../pages/**/*.tsx')
		);
	},

	setup({ el, App, props }) {
		hydrateRoot(el, <App {...props} />);
	},
});
