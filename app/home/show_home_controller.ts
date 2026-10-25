import type { HttpContext } from '@adonisjs/core/http';

export default class ShowHomeController {
	render({ inertia }: HttpContext) {
		return inertia.render('home/show_home', {});
	}
}
