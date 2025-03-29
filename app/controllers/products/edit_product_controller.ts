import { BaseProductController } from '#controllers/products/base_product_controller';
import { ProductRepository } from '#repositories/product_repository.ts';
import { GoogleImageService } from '#services/google_image_service';
import { ImageDownloadService } from '#services/image_download_service';
import { ProductType } from '#shared/types/index';
import { productTypeValidator } from '#validators/product';
import { inject } from '@adonisjs/core/container';
import { HttpContext } from '@adonisjs/core/http';

@inject()
export default class EditProductController extends BaseProductController {
	constructor(
		protected productRepository: ProductRepository,
		protected googleImageService: GoogleImageService,
		protected imageDownloadService: ImageDownloadService
	) {
		super(productRepository);
	}

	async showForm(ctx: HttpContext) {
		await ctx.request.validateUsing(productTypeValidator);
		const productType = ctx.params.productType as ProductType;
		const productId = ctx.params.id;

		if (!this.isSupportedProductType(productType)) {
			throw new Error('Product type not supported for editing');
		}

		const getMethod = this.getRepositoryGetByIdMethod(productType);
		const product = await getMethod(productId);

		return ctx.inertia.render(`periphs/edit_${productType}`, {
			product,
		});
	}

	async update(ctx: HttpContext) {
		await ctx.request.validateUsing(productTypeValidator);
		const productType = ctx.params.productType as ProductType;
		const productId = ctx.params.id;

		if (!this.isSupportedProductType(productType)) {
			throw new Error('Product type not supported for editing');
		}

		const validator = this.getValidator(productType);
		const product = await ctx.request.validateUsing(validator);

		let imagePath = product.image;

		if (
			product.brand !== ctx.request.input('brand') ||
			product.reference !== ctx.request.input('reference')
		) {
			const image = await this.googleImageService.getFirstImage(
				product.brand,
				product.reference
			);
			if (image) {
				imagePath = await this.imageDownloadService.downloadImage(image);
			}
		}

		const updateMethod = this.getRepositoryUpdateMethod(productType);
		await updateMethod(productId, product, imagePath);

		return ctx.response.redirect(`/periphs/${productType}`);
	}
}
