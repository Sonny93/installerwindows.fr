import { ProductRepository } from '#repositories/product_repository.ts';
import { GoogleImageService } from '#services/google_image_service';
import { ImageDownloadService } from '#services/image_download_service';
import { ProductType } from '#shared/types/index';
import {
	headsetValidator,
	keyboardValidator,
	monitorValidator,
	mouseValidator,
	productTypeValidator,
} from '#validators/product';
import { inject } from '@adonisjs/core/container';
import { HttpContext } from '@adonisjs/core/http';
import { VineValidator } from '@vinejs/vine';

type SupportedProductType = 'mouse' | 'keyboard' | 'monitor' | 'headset';

@inject()
export default class CreateProductController {
	private validators: Record<SupportedProductType, VineValidator<any, any>> = {
		mouse: mouseValidator,
		keyboard: keyboardValidator,
		monitor: monitorValidator,
		headset: headsetValidator,
	};

	constructor(
		private productRepository: ProductRepository,
		private googleImageService: GoogleImageService,
		private imageDownloadService: ImageDownloadService
	) {}

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

		const validator = this.validators[productType];
		const product = await ctx.request.validateUsing(validator);

		const image = await this.googleImageService.getFirstImage(
			product.brand,
			product.reference
		);
		if (!image) {
			return ctx.response.redirect().back();
		}

		const imagePath = await this.imageDownloadService.downloadImage(image);

		const createMethod =
			`create${productType.charAt(0).toUpperCase() + productType.slice(1)}` as keyof ProductRepository;
		await this.productRepository[createMethod](product, imagePath);

		return ctx.response.redirect(`/periphs/${productType}`);
	}

	private isSupportedProductType(
		productType: ProductType
	): productType is SupportedProductType {
		return Object.keys(this.validators).includes(productType);
	}
}
