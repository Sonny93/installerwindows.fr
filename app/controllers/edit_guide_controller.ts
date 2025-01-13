import { GuideService } from '#services/guide_service';
import { editGuideValidator } from '#validators/guide_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class EditGuideController {
	constructor(private guideService: GuideService) {}

	async render({ inertia, request }: HttpContext) {
		const guide = await this.guideService.getGuideBySlug(request.param('slug'));
		return inertia.render('guides/edit', { guide });
	}

	async execute({ request, response }: HttpContext) {
		const { params, ...payload } =
			await request.validateUsing(editGuideValidator);

		const guide = await this.guideService.getGuideBySlug(params.slug);
		await this.guideService.updateGuide(guide, payload);

		return response.redirect(`/guides/${guide.slug}`);
	}
}
