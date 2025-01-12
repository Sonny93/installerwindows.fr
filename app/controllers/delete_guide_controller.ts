import { GuideService } from '#services/guide_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class DeleteGuideController {
	constructor(private guideService: GuideService) {}

	async execute({ request, response }: HttpContext) {
		const guide = await this.guideService.getGuideBySlug(request.param('slug'));
		await this.guideService.deleteGuide(guide);
		return response.redirect('/guides');
	}
}
