import { authApiClient } from '@adonisjs/auth/plugins/api_client';
import app from '@adonisjs/core/services/app';
import testUtils from '@adonisjs/core/services/test_utils';
import { inertiaApiClient } from '@adonisjs/inertia/plugins/api_client';
import { sessionApiClient } from '@adonisjs/session/plugins/api_client';
import { shieldApiClient } from '@adonisjs/shield/plugins/api_client';
import { apiClient } from '@japa/api-client';
import { assert } from '@japa/assert';
import { pluginAdonisJS } from '@japa/plugin-adonisjs';
import type { Config } from '@japa/runner/types';
import { glob } from 'node:fs/promises';

import env from '#start/env';

/**
 * This file is imported by the "bin/test.ts" entrypoint file
 */

/**
 * Configure Japa plugins in the plugins array.
 * Learn more - https://japa.dev/docs/runner-config#plugins-optional
 */
export const plugins: Config['plugins'] = [
	assert(),
	pluginAdonisJS(app),
	apiClient(),
	sessionApiClient(app),
	authApiClient(app),
	shieldApiClient(),
	inertiaApiClient(app),
];

const TEST_DATABASE_SUFFIX = '_test';

/**
 * Refuses to run outside the test environment or against a database whose
 * name does not end with "_test": the migrate hook rolls every migration
 * back on teardown, which would wipe any other database.
 */
function assertTestDatabase() {
	const databaseName = env.get('DB_DATABASE');
	if (!app.inTest || !databaseName.endsWith(TEST_DATABASE_SUFFIX)) {
		throw new Error(
			`Refusing to run tests against database "${databaseName}" (NODE_ENV=${app.nodeEnvironment}): expected NODE_ENV=test and a database name ending with "${TEST_DATABASE_SUFFIX}"`
		);
	}
}

/**
 * Fails the run if a spec file matches none of the suite "files" patterns
 * declared in adonisrc.ts, which would otherwise mean it silently never runs.
 */
async function assertEverySpecFileIsClassified() {
	const classifiedFiles = new Set<string>();
	for (const suite of app.rcFile.tests.suites) {
		const patterns = Array.isArray(suite.files) ? suite.files : [suite.files];
		for (const pattern of patterns) {
			for await (const file of glob(pattern)) classifiedFiles.add(file);
		}
	}

	const orphanFiles: string[] = [];
	for await (const file of glob('app/**/*.spec.ts')) {
		if (!classifiedFiles.has(file)) orphanFiles.push(file);
	}

	if (orphanFiles.length > 0) {
		throw new Error(
			`Spec file(s) matched by no suite in adonisrc.ts and would never run: ${orphanFiles.join(', ')}`
		);
	}
}

/**
 * Configure lifecycle function to run before and after all the
 * tests.
 *
 * The setup functions are executed before all the tests
 * The teardown functions are executed after all the tests
 */
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
	setup: [
		assertTestDatabase,
		assertEverySpecFileIsClassified,
		() => testUtils.db().migrate(),
	],
	teardown: [],
};

/**
 * Configure suites by tapping into the test suite instance.
 * Learn more - https://japa.dev/docs/test-suites#lifecycle-hooks
 */
export const configureSuite: Config['configureSuite'] = (suite) => {
	if (['browser', 'functional', 'e2e'].includes(suite.name)) {
		return suite.setup(() => testUtils.httpServer().start());
	}
};
