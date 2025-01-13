import { MarkdownService } from '#services/markdown_service';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import { readFile } from 'node:fs/promises';

@inject()
export default class CguController {
	constructor(private markdownService: MarkdownService) {}

	async render({ inertia }: HttpContext) {
		const markdownPath = app.makePath('markdown', 'cgu.md');
		const markdownFile = await readFile(markdownPath, 'utf-8');
		const htmlWithToc =
			await this.markdownService.markdownToHtmlWithToc(markdownFile);
		return inertia.render('cgu', htmlWithToc);
	}
}
