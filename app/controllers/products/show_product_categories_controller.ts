import { BaseProductController } from '#controllers/products/base_product_controller';
import { ProductRepository } from '#repositories/product_repository.ts';
import { productTypeValidator } from '#validators/product';
import { inject } from '@adonisjs/core/container';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowProductCategoriesController extends BaseProductController {
	constructor(protected productRepository: ProductRepository) {
		super(productRepository);
	}

	async render(ctx: HttpContext) {
		const count = await this.productRepository.getCountPerCategory();
		return ctx.inertia.render('periphs/index', { count });
	}

	async categoryRender(ctx: HttpContext) {
		const { params } = await ctx.request.validateUsing(productTypeValidator);
		const products = await this.productRepository.getProductsByCategory(
			params.productType
		);
		return ctx.inertia.render('periphs/category', {
			products,
			productType: params.productType,
		});
	}
}
