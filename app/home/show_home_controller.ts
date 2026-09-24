import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

import { GithubService } from '#markdown/github_service';
import { MarkdownService } from '#markdown/markdown_service';

@inject()
export default class ShowHomeController {
	constructor(
		private readonly githubService: GithubService,
		private readonly markdownService: MarkdownService
	) {}

	async render({ inertia }: HttpContext) {
		const markdown = await this.githubService.getHtmlFromUrl(
			'https://raw.githubusercontent.com/Piwielle/windows_11/master/README.md'
		);
		const html = await this.markdownService.markdownToHtml(markdown);
		return inertia.render('home/show_home', { html });
	}
}
