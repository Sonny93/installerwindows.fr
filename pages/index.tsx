import React from 'react';
import Link from 'next/link';

import { NextSeo } from 'next-seo';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { downloadMarkdown, urlify } from '../Utils';
import styles from '../styles/home.module.scss';

const HOME_MARKDOWN_URL: string = 'https://raw.githubusercontent.com/Piwielle/windows_11/master/README.md';

export default function Home({ markdown }: { markdown: string; }) {
	if (!markdown) {
		return (<>
			<NextSeo
				title='Installerwindows.fr'
			/>
			<div className={styles['Home']}>
				<p
					style={{ textAlign: 'center' }}
					dangerouslySetInnerHTML={{ __html: `Bienvenue sur ${urlify('https://installerwindows.fr/')} !` }}
				/>
			</div>
		</>);
	}

	return (<>
		<div className={styles['Home']}>
			<ReactMarkdown
				// @ts-ignore
				rehypePlugins={[rehypeRaw]}
				linkTarget='_blank'
				components={{
					a({ href, children }) {
						const url = 'https://installerwindows.fr';
						if (!href.startsWith(url)) {
							return (<>
								<a href={href} target='_blank' rel='noreferrer'>
									{children}
								</a>
							</>);
						} else {
							const path = href.split(url)[1];
							return (<>
								<Link href={path}>
									<a>{children}</a>
								</Link>
							</>);
						}
					}
				}}
				className={styles['markdown-gh']}
			>
				{markdown}
			</ReactMarkdown>
		</div>
	</>);
}

export async function getServerSideProps() {
	return {
		props: {
			markdown: await downloadMarkdown(HOME_MARKDOWN_URL)
		}
	}
}