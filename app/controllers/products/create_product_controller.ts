import { ProductRepository } from '#repositories/product_repository.ts';
import { mouseValidator } from '#validators/product';
import { inject } from '@adonisjs/core/container';
import { HttpContext } from '@adonisjs/core/http';

@inject()
export default class CreateProductController {
	constructor(private productRepository: ProductRepository) {}

	async showMouseForm(ctx: HttpContext) {
		return ctx.inertia.render('periphs/create_mouse');
	}

	async storeMouse(ctx: HttpContext) {
		const mouse = await ctx.request.validateUsing(mouseValidator);
		await this.productRepository.createMouse(mouse);
		ctx.session.flash('success', 'Souris ajoutée avec succès');
		return ctx.response.redirect().back();
	}
}
