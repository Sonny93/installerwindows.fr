import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { AuthService } from '#services/auth_service';
import AuthenticationRefusedException from '#exceptions/authentication_refused_exception';

@inject()
export default class DiscordCallbackController {
	constructor(private readonly authService: AuthService) {}

	async render(ctx: HttpContext) {
		const provider = ctx.ally.use('discord');

		if (provider.accessDenied()) {
			throw new AuthenticationRefusedException('Accès refusé');
		}

		if (provider.stateMisMatch()) {
			throw new AuthenticationRefusedException('La requête a expiré');
		}

		if (provider.hasError()) {
			throw new AuthenticationRefusedException(
				provider.getError() ?? 'Une erreur est survenue'
			);
		}

		const discordUser = await provider.user();
		this.authService.authorizeProviderId(discordUser.id);
		const user = await this.authService.upsertDiscordUser({
			providerId: discordUser.id,
			name: discordUser.name,
			nickName: discordUser.nickName,
			avatarUrl: discordUser.avatarUrl,
			token: discordUser.token,
		});

		await ctx.auth.use('web').login(user);
		ctx.logger.info(`[${user.name}] auth success`);
		return ctx.response.redirect().toRoute('home.show_home');
	}
}
