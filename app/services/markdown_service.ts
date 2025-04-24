import { YoutubeService } from '#services/youtube_service';
import { TocItem } from '#shared/types/index';
import env from '#start/env';
import { inject } from '@adonisjs/core';
import logger from '@adonisjs/core/services/logger';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

type ExtractToc = (toc: TocItem[]) => (tree: any) => void;

@inject()
export class MarkdownService {
	private appUrl: string = env.get('APP_URL');

	constructor(private youtubeService: YoutubeService) {}

	extractToc: ExtractToc = (toc) => {
		return (tree) => {
			visit(tree, 'element', (node: any) => {
				if (/^h[1-6]$/.test(node.tagName)) {
					const level = Number.parseInt(node.tagName.charAt(1), 10);
					const text = node.children
						.map((child: any) => {
							if (child.type === 'text') return child.value;
							if (child.type === 'element') {
								return child.children
									.map((nested: any) => {
										if (nested.type === 'text') return nested.value;
										return '';
									})
									.join('');
							}
							return '';
						})
						.join('');
					const id = node.properties.id;

					toc.push({ level, text, id });
				}
			});
		};
	};

	async markdownToHtmlWithToc(
		markdown: string
	): Promise<{ html: string; toc: TocItem[] }> {
		const toc: TocItem[] = [];

		const file = await unified()
			.use(remarkParse)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(rehypeSlug)
			.use(rehypeAutolinkHeadings, { behavior: 'wrap' })
			.use(() => this.extractToc(toc))
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(markdown);

		const html = await this.replaceMarkdownLinks(file.toString());
		return { html, toc };
	}

	async markdownToHtml(markdown: string): Promise<string> {
		const file = await unified()
			.use(remarkParse)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(markdown);

		const html = await this.replaceMarkdownLinks(file.toString());
		return html;
	}

	private async replaceMarkdownLinks(markdown: string): Promise<string> {
		markdown = markdown.replace(
			/https?:\/\/installerwindows\.fr\/([\w\-\/]+)([^\s")]*)/g,
			(_, path) => `${this.appUrl}/${path}`
		);

		const youtubeRegex =
			/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/g;

		try {
			const playlist = await this.youtubeService.getPlaylist();
			const playlistVideos = playlist.map((video: { id: string }) => video.id);

			markdown = markdown.replace(youtubeRegex, (match, videoId) => {
				if (playlistVideos.includes(videoId)) {
					return `${this.appUrl}/videos/${videoId}`;
				}
				return match;
			});
		} catch (error) {
			logger.error(error);
		}

		return markdown;
	}
}
