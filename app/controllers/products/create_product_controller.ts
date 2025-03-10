import { ProductRepository } from '#repositories/product_repository.ts';
import { GoogleImageService } from '#services/google_image_service';
import { ImageDownloadService } from '#services/image_download_service';
import { mouseValidator } from '#validators/product';
import { inject } from '@adonisjs/core/container';
import { HttpContext } from '@adonisjs/core/http';

@inject()
export default class CreateProductController {
	constructor(
		private productRepository: ProductRepository,
		private googleImageService: GoogleImageService,
		private imageDownloadService: ImageDownloadService
	) {}

	async showMouseForm(ctx: HttpContext) {
		return ctx.inertia.render('periphs/create_mouse');
	}

	async storeMouse(ctx: HttpContext) {
		const mouse = await ctx.request.validateUsing(mouseValidator);

		const image = await this.googleImageService.getFirstImage(
			mouse.brand,
			mouse.reference
		);
		if (!image) {
			return ctx.response.redirect().back();
		}

		const imagePath = await this.imageDownloadService.downloadImage(image);

		await this.productRepository.createMouse(mouse, imagePath);
		return ctx.response.redirect().back();
	}
}
