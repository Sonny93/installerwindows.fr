import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { GuideService } from '#guides/guide_service';
import { createGuideValidator } from '#guides/validators/create_guide_validator';

@inject()
export default class CreateGuideController {
	constructor(private readonly guideService: GuideService) {}

	async render({ inertia }: HttpContext) {
		return inertia.render('guides/create_guide', {});
	}

	async execute({ request, response }: HttpContext) {
		const payload = await request.validateUsing(createGuideValidator);
		const guide = await this.guideService.createGuide(payload);
		return response
			.redirect()
			.toRoute('guides.show_guide', { guideSlug: guide.slug });
	}
}
