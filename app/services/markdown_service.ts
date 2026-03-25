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
	private readonly appUrl: string = env.get('APP_URL');

	constructor(private readonly youtubeService: YoutubeService) {}

	/**
	 * Builds a unified tree visitor that fills an array with heading levels, slugs, and labels extracted from h1–h6 elements.
	 * @param toc Mutable array that will receive table-of-contents entries.
	 * @returns Function to plug into the unified pipeline to walk the AST.
	 */
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

	/**
	 * Converts a Markdown string to HTML with slugs, autolinked headings, and extracts a table of contents.
	 * @param markdown Full Markdown source.
	 * @returns Final HTML and list of TOC entries.
	 */
	async markdownToHtmlWithToc(
		markdown: string
	): Promise<{ html: string; toc: TocItem[] }> {
		const toc: TocItem[] = [];

		const file = await unified()
			.use(remarkParse)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(rehypeSlug)
			.use(rehypeAutolinkHeadings, {
				behavior: 'prepend',
				headingProperties: {
					className: ['flex', 'flex-wrap', 'items-center', 'gap-2'],
				},
				properties: {
					className: ['inline-flex', 'shrink-0', 'items-center'],
					ariaHidden: 'true',
					tabIndex: -1,
				},
				content: {
					type: 'element',
					tagName: 'span',
					properties: {
						className: [
							'i-heroicons-link-16-solid',
							'text-blue-400',
							'inline-block',
							'shrink-0',
						],
					},
					children: [],
				},
			})
			.use(() => this.extractToc(toc))
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(markdown);

		const html = await this.replaceMarkdownLinks(file.toString());
		return { html, toc };
	}

	/**
	 * Converts a Markdown string to HTML without extracting a table of contents.
	 * @param markdown Markdown source.
	 * @returns Stringified HTML fragment after link post-processing.
	 */
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

	/**
	 * Rewrites absolute public-domain URLs and YouTube videos that appear in the configured playlist to internal site routes.
	 * @param markdown HTML or fragment containing links to normalize.
	 * @returns String with links replaced where applicable.
	 */
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
