import { GithubService } from '#services/github_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';

@inject()
export default class HomeController {
	constructor(private githubService: GithubService) {}

	async render({ inertia }: HttpContext) {
		const markdown = await this.githubService.getHtmlFromUrl(
			'https://raw.githubusercontent.com/Piwielle/windows_11/master/README.md'
		);
		return inertia.render('home', { markdown: markdown.toString() });
	}
}
