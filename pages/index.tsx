import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { downloadMarkdown } from '../Utils';

import Loader from '../Components/Loader/Loader';
import styles from '../styles/home.module.scss';

const HOME_MARKDOWN_URL: string = 'https://raw.githubusercontent.com/Piwielle/oui/master/README.md';

export default function Home() {
    const [markdown, setMarkdown] = useState<string | null>(null);
    useEffect(() => {
        downloadMarkdown(HOME_MARKDOWN_URL, setMarkdown);
    });

    if (!markdown) {
        return (<>
            <Loader text='Chargement de la page en cours' />
        </>);
    }

    return (<>
        <div className={styles['Home']}>
            <p>
                Avant de{' '}
                <Link href='/videos'>
                    <a>voir les vidéos</a>
                </Link>
                , nous vous recommandons de lire le texte ci-dessous.
            </p>
            {/* @ts-ignore */}
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={markdown} linkTarget='_blank' className={styles['markdown-gh']} />
        </div>
    </>);
}
