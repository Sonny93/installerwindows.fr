import { BaseProductController } from '#controllers/products/base_product_controller';
import { ProductRepository } from '#repositories/product_repository.ts';
import { GoogleImageService } from '#services/google_image_service';
import { ImageDownloadService } from '#services/image_download_service';
import { ProductType } from '#shared/types/index';
import { productTypeValidator } from '#validators/product';
import { inject } from '@adonisjs/core/container';
import { HttpContext } from '@adonisjs/core/http';

@inject()
export default class CreateProductController extends BaseProductController {
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
		return ctx.inertia.render(`periphs/create_${productType}`);
	}

	async store(ctx: HttpContext) {
		await ctx.request.validateUsing(productTypeValidator);
		const productType = ctx.params.productType as ProductType;
		if (!this.isSupportedProductType(productType)) {
			throw new Error('Product type not supported for creation');
		}

		const validator = this.getValidator(productType);
		const product = await ctx.request.validateUsing(validator);

		const image = await this.googleImageService.getFirstImage(
			product.brand,
			product.reference
		);
		if (!image) {
			return ctx.response.redirect().back();
		}

		const imagePath = await this.imageDownloadService.downloadImage(image);

		const createMethod = this.getRepositoryCreateMethod(productType);
		await createMethod(product, imagePath);

		return ctx.response.redirect(`/periphs/${productType}`);
	}
}
