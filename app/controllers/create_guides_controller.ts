import { GuideService } from '#services/guide_service';
import { guideValidator } from '#validators/guide_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class CreateGuidesController {
	constructor(private guideService: GuideService) {}

	async render({ inertia }: HttpContext) {
		return inertia.render('guides/new');
	}

	async execute({ request, response }: HttpContext) {
		const payload = await request.validateUsing(guideValidator);
		const guide = await this.guideService.createGuide(payload);
		return response.redirect(`/guides/${guide.slug}`);
	}
}
