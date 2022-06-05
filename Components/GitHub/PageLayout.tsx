import { downloadMarkdown } from '../../Utils';
import styles from '../../styles/markdown.module.scss';
import { NextSeo } from 'next-seo';
import NoMarkdown from './NoMarkdown';
import Markdown from './Markdown';
import Source from './Source';

export default function MarkdownPage({
	content,
	url,
	urlRaw,
	pageTitle
}: {
	content: string;
	url: string;
	urlRaw: string;
	pageTitle: string;
}) {
	if (!content) {
		return (<>
			<NextSeo title={pageTitle} />
			<div className={styles['App']}>
				<NoMarkdown />
			</div>
		</>);
	}

	return (<>
		<div className={styles['App']}>
			<Markdown
				markdown={content}
				innerClassName={styles['markdown-gh']}
			/>
			<Source
				url={url}
				raw={urlRaw}
			/>
		</div>
	</>);
}