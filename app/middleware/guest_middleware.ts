import type { Authenticators } from '@adonisjs/auth/types';
import type { HttpContext } from '@adonisjs/core/http';
import { urlFor } from '@adonisjs/core/services/url_builder';
import type { NextFn } from '@adonisjs/core/types/http';

/**
 * Guest middleware is used to deny access to routes that should
 * be accessed by unauthenticated users.
 *
 * For example, the login page should not be accessible if the user
 * is already logged-in
 */
export default class GuestMiddleware {
	/**
	 * The route to redirect to when user is logged-in
	 */
	redirectToRoute = 'home.show_home' as const;

	async handle(
		ctx: HttpContext,
		next: NextFn,
		options: { guards?: (keyof Authenticators)[] } = {}
	) {
		for (let guard of options.guards ?? [ctx.auth.defaultGuard]) {
			if (await ctx.auth.use(guard).check()) {
				return ctx.response.redirect(urlFor(this.redirectToRoute), true);
			}
		}

		return next();
	}
}
