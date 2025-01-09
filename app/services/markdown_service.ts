import { TocItem } from '#shared/types/index';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

type ExtractToc = (toc: TocItem[]) => (tree: any) => void;

export class MarkdownService {
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

		return { html: file.toString(), toc };
	}

	async markdownToHtml(markdown: string): Promise<string> {
		const file = await unified()
			.use(remarkParse)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeRaw)
			.use(rehypeStringify, { allowDangerousHtml: true })
			.process(markdown);
		return file.toString();
	}
}
