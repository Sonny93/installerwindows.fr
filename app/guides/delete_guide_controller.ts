import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { GuideService } from '#guides/guide_service';

@inject()
export default class DeleteGuideController {
	constructor(private readonly guideService: GuideService) {}

	async execute({ request, response }: HttpContext) {
		const guide = await this.guideService.getGuideBySlug(request.param('slug'));
		await this.guideService.deleteGuide(guide);
		return response.redirect().toRoute('guides.show_guides');
	}
}
