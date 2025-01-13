import { GithubService } from '#services/github_service';
import { MarkdownService } from '#services/markdown_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class HomeController {
	constructor(
		private githubService: GithubService,
		private markdownService: MarkdownService
	) {}

	async render({ inertia }: HttpContext) {
		const markdown = await this.githubService.getHtmlFromUrl(
			'https://raw.githubusercontent.com/Piwielle/windows_11/master/README.md'
		);
		// const { html, toc } =
		// 	await this.markdownService.markdownToHtmlWithToc(markdown);
		const html = await this.markdownService.markdownToHtml(markdown);
		return inertia.render('home', { html });
	}
}
