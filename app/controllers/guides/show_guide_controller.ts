import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { GuideService } from '#services/guide_service';
import { GithubService } from '#services/github_service';
import { MarkdownService } from '#services/markdown_service';

@inject()
export default class ShowGuideController {
	constructor(
		private readonly guideService: GuideService,
		private readonly githubService: GithubService,
		private readonly markdownService: MarkdownService
	) {}

	async render({ request, inertia }: HttpContext) {
		const { guideSlug } = request.params();
		const guide = await this.guideService.getGuideBySlug(guideSlug);
		const markdown = await this.githubService.getHtmlFromUrl(
			guide.githubRawUrl
		);
		const htmlAndToc =
			await this.markdownService.markdownToHtmlWithToc(markdown);
		return inertia.render(
			'guides/show',
			{
				...htmlAndToc,
				githubUrl: this.githubService.toBlobUrl(guide.githubRawUrl),
				slug: guide.slug,
			},
			{
				title: guide.title,
				thumbnail: guide.thumbnail,
			}
		);
	}
}
