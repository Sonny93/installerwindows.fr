import { GuideService } from '#services/guide_service';
import GuideTransformer from '#transformers/guide_transformer';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class GuidesController {
	constructor(private readonly guideService: GuideService) {}

	async render({ inertia }: HttpContext) {
		const guides = await this.guideService.getAllGuides();
		return inertia.render('guides/index', {
			guides: GuideTransformer.transform(guides),
		});
	}
}
