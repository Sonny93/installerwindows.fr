import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { downloadMarkdown } from '../Utils';

import FullLoader from '../Components/Loader/FullLoader';
import styles from '../styles/home.module.scss';

const HOME_MARKDOWN_URL: string = 'https://raw.githubusercontent.com/Piwielle/windows_11/master/README.md';

export default function Home() {
    const [markdown, setMarkdown] = useState<string | null>(null);
    useEffect(() => {
        downloadMarkdown(HOME_MARKDOWN_URL, setMarkdown);
    }, []);

    if (!markdown) {
        return (<>
            <FullLoader text='Chargement de la page en cours' />
        </>);
    }

    return (<>
        <div className={styles['Home']}>
            {/* @ts-ignore */}
            <ReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget='_blank' className={styles['markdown-gh']}>
                {markdown}
            </ReactMarkdown>
        </div>
    </>);
}
