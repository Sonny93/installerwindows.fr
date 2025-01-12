import { GithubService } from '#services/github_service';
import { GuideService } from '#services/guide_service';
import { MarkdownService } from '#services/markdown_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class ShowGuideController {
	constructor(
		private guideService: GuideService,
		private githubService: GithubService,
		private markdownService: MarkdownService
	) {}

	async render({ request, inertia }: HttpContext) {
		const { guideSlug } = request.params();
		const guide = await this.guideService.getGuideBySlug(guideSlug);
		const markdown = await this.githubService.getHtmlFromUrl(
			guide.githubRawUrl
		);
		const htmlAndToc =
			await this.markdownService.markdownToHtmlWithToc(markdown);
		return inertia.render('guides/show', htmlAndToc);
	}
}
