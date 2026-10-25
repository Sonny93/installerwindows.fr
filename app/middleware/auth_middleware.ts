import type { Authenticators } from '@adonisjs/auth/types';
import type { HttpContext } from '@adonisjs/core/http';
import { urlFor } from '@adonisjs/core/services/url_builder';
import type { NextFn } from '@adonisjs/core/types/http';

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
	/**
	 * The route to redirect to, when authentication fails
	 */
	redirectToRoute = 'auth.login' as const;

	async handle(
		ctx: HttpContext,
		next: NextFn,
		options: {
			guards?: (keyof Authenticators)[];
		} = {}
	) {
		await ctx.auth.authenticateUsing(options.guards, {
			loginRoute: urlFor(this.redirectToRoute),
		});
		return next();
	}
}
