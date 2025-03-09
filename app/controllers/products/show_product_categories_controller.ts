import { ProductRepository } from '#repositories/product_repository.ts';
import { productCategoryValidator } from '#validators/product';
import { inject } from '@adonisjs/core/container';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowProductCategoriesController {
	constructor(private productRepository: ProductRepository) {}

	async render(ctx: HttpContext) {
		const count = await this.productRepository.getCountPerCategory();
		return ctx.inertia.render('periphs/index', { count });
	}

	async categoryRender(ctx: HttpContext) {
		const { params } = await ctx.request.validateUsing(
			productCategoryValidator
		);
		const products = await this.productRepository.getProductsByCategory(
			params.category
		);
		return ctx.inertia.render('periphs/category', {
			products,
			category: params.category,
		});
	}
}
