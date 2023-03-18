import { NextSeo } from 'next-seo';

import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Markdown from './Markdown';
import NoMarkdown from './NoMarkdown';
import Source from './Source';

import styles from '../../styles/markdown.module.scss';

export default function MarkdownPage({
    content,
    url,
    urlRaw,
    pageTitle,
    disableChapters,
}: {
    content: string;
    url?: string;
    urlRaw?: string;
    pageTitle?: string;
    disableChapters?: boolean;
}) {
    if (!content) {
        return (
            <>
                {pageTitle && <NextSeo title={pageTitle} />}
                <div className={styles['App']}>
                    <Navbar />
                    <NoMarkdown />
                </div>
            </>
        );
    }

    return (
        <>
            {pageTitle && <NextSeo title={pageTitle} />}
            <div className={styles['App']}>
                <Navbar />
                <Markdown
                    markdown={content}
                    innerClassName={styles['markdown-gh']}
                    disableChapters={disableChapters}
                />
                <Source url={url} raw={urlRaw} />
                <Footer />
            </div>
        </>
    );
}
