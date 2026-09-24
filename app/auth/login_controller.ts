import type { HttpContext } from '@adonisjs/core/http';

export default class LoginController {
	render({ ally }: HttpContext) {
		return ally.use('discord').redirect();
	}
}
