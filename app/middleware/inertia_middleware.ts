import UserAuthTransformer, {
	guestAuth,
} from '#transformers/user_auth_transformer';
import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware';
import type { InferSharedProps } from '@adonisjs/inertia/types';
import packageJson from '../../package.json' with { type: 'json' };

export default class InertiaMiddleware extends BaseInertiaMiddleware {
	async share(ctx: HttpContext) {
		const { session } = ctx;
		const isAuthenticated = await ctx.auth?.check();
		const user = ctx.auth?.user;
		return {
			errors: ctx.inertia.always(this.getValidationErrors(ctx)),
			flash: ctx.inertia.always(session?.flashMessages.get('flash')),
			auth: ctx.inertia.always(
				isAuthenticated && user
					? UserAuthTransformer.transform(user)
					: guestAuth
			),
			version: ctx.inertia.always(packageJson.version),
		};
	}

	async handle(ctx: HttpContext, next: NextFn) {
		await this.init(ctx);
		const output = await next();
		this.dispose(ctx);
		return output;
	}
}

export type InertiaMiddlewareSharedProps = InferSharedProps<InertiaMiddleware>;

declare module '@adonisjs/inertia/types' {
	export interface SharedProps extends InertiaMiddlewareSharedProps {}
}
