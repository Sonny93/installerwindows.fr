import User from '#models/user';
import env from '#start/env';
import type { HttpContext } from '@adonisjs/core/http';

export default class AuthController {
	discord = (ctx: HttpContext) => ctx.ally.use('discord').redirect();

	async authCallback(ctx: HttpContext) {
		const provider = ctx.ally.use('discord');
		if (provider.accessDenied()) {
			return this.redirectWithFlash(ctx, 'Accès refusé');
		}

		if (provider.stateMisMatch()) {
			return this.redirectWithFlash(ctx, 'La requête a expiré');
		}

		if (provider.hasError()) {
			return this.redirectWithFlash(
				ctx,
				provider.getError() || 'Une erreur est survenue'
			);
		}

		const {
			email,
			id: providerId,
			name,
			nickName,
			avatarUrl,
			token,
		} = await provider.user();

		const usersIds = env.get('USERS_IDS').split(',');
		if (!usersIds.includes(providerId)) {
			return this.redirectWithFlash(ctx, 'Accès refusé');
		}

		const user = await User.updateOrCreate(
			{
				email,
			},
			{
				email,
				providerId,
				name,
				nickName,
				avatarUrl,
				token,
				providerType: 'discord',
				isAdmin: false,
			}
		);

		await ctx.auth.use('web').login(user);
		ctx.logger.info(`[${user.name}] auth success`);
		ctx.response.redirect('/');
	}

	async logout(ctx: HttpContext) {
		await ctx.auth.use('web').logout();
		ctx.response.redirect('/');
	}

	private redirectWithFlash(ctx: HttpContext, flash: string) {
		const userEmail = ctx.auth.user?.email;
		ctx.logger.info(`${userEmail && `[${userEmail}] `}${flash.toLowerCase()}`);
		ctx.session.flash('flash', flash);
		ctx.response.redirect('/');
	}
}
