import { healthChecks } from '#start/health';
import type { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';

export default class HealthChecksController {
	async render({ inertia }: HttpContext) {
		const report = await healthChecks.run();
		logger.info(report);
		return inertia.render('status', {
			status: report.isHealthy,
			services: report.checks.map((check) => ({
				name: check.name,
				status: check.status,
				message: check.message,
			})),
		});
	}
}
