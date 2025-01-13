import { HealthChecks, MemoryHeapCheck } from '@adonisjs/core/health';
import { DbCheck, DbConnectionCountCheck } from '@adonisjs/lucid/database';
import db from '@adonisjs/lucid/services/db';

export const healthChecks = new HealthChecks().register([
	new MemoryHeapCheck().as('Mémoire'),
	new DbCheck(db.connection()).as('Base de données'),
	new DbConnectionCountCheck(db.connection()).as(
		'Connexions à la base de données'
	),
]);
