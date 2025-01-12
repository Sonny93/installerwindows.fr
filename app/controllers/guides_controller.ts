import { GuideService } from '#services/guide_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class GuidesController {
	constructor(private guideService: GuideService) {}

	async index({ inertia }: HttpContext) {
		const guides = await this.guideService.getAllGuides();
		return inertia.render('guides/index', {
			guides,
		});
	}
}
