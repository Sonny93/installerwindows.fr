import { PeriphRepository } from '#repositories/periph_repository';
import { inject } from '@adonisjs/core/container';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowPeriphCategoriesController {
	async index(ctx: HttpContext) {
		const count = await PeriphRepository.getCountPerCategory();
		return ctx.inertia.render('periphs/index', { count });
	}
}
