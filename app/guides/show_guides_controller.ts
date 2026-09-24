import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { GuideService } from '#guides/guide_service';
import GuideTransformer from '#guides/guide_transformer';

@inject()
export default class ShowGuidesController {
	constructor(private readonly guideService: GuideService) {}

	async render({ inertia }: HttpContext) {
		const guides = await this.guideService.getAllGuides();
		return inertia.render('guides/show_guides', {
			guides: GuideTransformer.transform(guides),
		});
	}
}
