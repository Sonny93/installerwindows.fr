import { GuideService } from '#services/guide_service';
import { slugify } from '#shared/utils/index';
import { createGuideValidator } from '#validators/create_guide_validator';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class CreateGuidesController {
	constructor(private guideService: GuideService) {}

	async render({ inertia }: HttpContext) {
		return inertia.render('guides/new');
	}

	async execute({ request, response }: HttpContext) {
		const { title, thumbnail, githubUrl } =
			await request.validateUsing(createGuideValidator);

		const guide = await this.guideService.createGuide({
			title,
			slug: slugify(title),
			thumbnail,
			githubUrl,
		});
		console.log(guide);

		return response.redirect(`/guides/${guide.slug}`);
	}
}
