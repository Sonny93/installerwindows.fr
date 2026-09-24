import { unified } from 'unified';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkParse from 'remark-parse';
import { inject } from '@adonisjs/core';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';
import rehypeStringify from 'rehype-stringify';
import logger from '@adonisjs/core/services/logger';
import type { Root, Element, ElementContent } from 'hast';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

import env from '#start/env';
import { YoutubeService } from '#services/youtube_service';

export type TocItem = {
	level: number;
	text: string;
	id: string;
};

type ExtractToc = (toc: TocItem[]) => (tree: Root) => void;

@inject()
export class MarkdownService {
	private readonly appUrl: string = env.get('APP_URL');

	constructor(private readonly youtubeService: YoutubeService) {}

	/**
	 * Builds a unified tree visitor that fills an array with heading levels, slugs, and labels extracted from h1–h6 elements.
	 * rehype-sanitize and rehype-slug both run earlier in the pipeline, so every heading element is expected to
	 * carry a string `id` by the time this visitor runs; a missing or non-string id means the pipeline order was
	 * broken upstream, so the visitor throws instead of silently producing a table-of-contents entry with no anchor.
	 * @param toc Mutable array that will receive table-of-contents entries.
	 * @returns Function to plug into the unified pipeline to walk the AST.
	 */
	extractToc: ExtractToc = (toc) => {
		return (tree) => {
			visit(tree, 'element', (node) => {
				if (!/^h[1-6]$/.test(node.tagName)) return;

				const level = Number.parseInt(node.tagName.charAt(1), 10);
				const text = node.children.map(getTextContent).join('');
				const id = node.properties.id;
				if (typeof id !== 'string') {
					throw new Error(
						`Expected heading "${text}" to have a string id set by rehype-slug`
					);
				}

				toc.push({ level, text, id });
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
			.use(rehypeSanitize, defaultSchema)
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
			.use(rehypeSanitize, defaultSchema)
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
			/https?:\/\/installerwindows\.fr\/([\w\-/]+)([^\s")]*)/g,
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

/**
 * Recursively concatenates the text content of a heading's children, descending into
 * nested elements (e.g. a heading wrapping its text in a `<code>` or `<strong>` tag).
 * @param node Hast node to extract text from.
 * @returns Concatenated text content of the node and its descendants.
 */
function getTextContent(node: ElementContent): string {
	if (node.type === 'text') return node.value;
	if (node.type === 'element') return getElementTextContent(node);
	return '';
}

/**
 * @param element Hast element to extract text from.
 * @returns Concatenated text content of the element's children.
 */
function getElementTextContent(element: Element): string {
	return element.children.map(getTextContent).join('');
}
