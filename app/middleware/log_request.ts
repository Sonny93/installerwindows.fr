import { HttpContext } from '@adonisjs/core/http';
import logger from '@adonisjs/core/services/logger';

export default class LogRequest {
	async handle({ request }: HttpContext, next: () => Promise<void>) {
		const ignoreList = [
			'/node_modules',
			'/inertia',
			'/@vite',
			'/@react-refresh',
			'.ts',
			'package.json',
		];
		if (!ignoreList.some((ignore) => request.url().includes(ignore))) {
			logger.debug(`[${request.method()}]: ${request.url()}`);
		}
		await next();
	}
}
