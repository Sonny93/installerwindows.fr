import { inject } from '@adonisjs/core';
import { readFile } from 'node:fs/promises';
import app from '@adonisjs/core/services/app';
import type { HttpContext } from '@adonisjs/core/http';

import { MarkdownService } from '#services/markdown_service';

@inject()
export default class CguController {
	constructor(private readonly markdownService: MarkdownService) {}

	async render({ inertia }: HttpContext) {
		const markdownPath = app.makePath('markdown', 'cgu.md');
		const markdownFile = await readFile(markdownPath, 'utf-8');
		const htmlWithToc =
			await this.markdownService.markdownToHtmlWithToc(markdownFile);
		return inertia.render('cgu', htmlWithToc);
	}
}
