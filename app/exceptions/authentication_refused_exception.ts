import { Exception } from '@adonisjs/core/exceptions';
import type { HttpContext } from '@adonisjs/core/http';

/**
 * Raised whenever an OAuth authentication attempt must be denied: the
 * provider reports an error, the callback state expired, or the
 * authenticated identity is not allow-listed. Self-handles by flashing the
 * given French message and redirecting home, matching the behavior the
 * auth controller used to implement inline.
 */
export default class AuthenticationRefusedException extends Exception {
	static status = 401;
	static code = 'E_AUTHENTICATION_REFUSED';

	constructor(readonly flashMessage: string) {
		super(flashMessage);
	}

	async handle(error: this, { auth, logger, session, response }: HttpContext) {
		const userName = auth.user?.fullname;
		logger.info(
			`${userName ? `[${userName}] ` : ''}${error.flashMessage.toLowerCase()}`
		);
		session.flash('flash', error.flashMessage);
		return response.redirect().toRoute('home.show_home');
	}
}
