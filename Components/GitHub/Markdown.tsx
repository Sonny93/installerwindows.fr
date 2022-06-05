import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { AnchorHTMLAttributes, ClassAttributes, ImgHTMLAttributes } from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ReactMarkdownProps } from 'react-markdown/src/ast-to-react';

const DOMAIN_URL = 'https://installerwindows.fr';

interface MarkdownProps {
	markdown: string;
	innerClassName?: string;
}
export default function Markdown({ markdown, innerClassName }: MarkdownProps) {
	return (<>
		<ReactMarkdown
			// @ts-ignore
			rehypePlugins={[rehypeRaw]}
			linkTarget='_blank'
			components={{
				a: A_Builder,
				img: IMG_Builder
			}}
			className={innerClassName}
		>
			{markdown}
		</ReactMarkdown>
	</>);
}

type CustomAComponentsProps = ClassAttributes<HTMLAnchorElement>
	& AnchorHTMLAttributes<HTMLAnchorElement>
	& ReactMarkdownProps;

const A_Builder = ({ href, children }: CustomAComponentsProps) => {
	if (!href.startsWith(DOMAIN_URL)) {
		return (<>
			<a href={href} target='_blank' rel='noreferrer'>
				{children}
			</a>
		</>);
	}

	const path = href.split(DOMAIN_URL)[1];
	return (<>
		<Link href={path} scroll={true}>
			<a>{children}</a>
		</Link>
	</>);
}

type CustomImgComponentsProps = ClassAttributes<HTMLImageElement>
	& ImgHTMLAttributes<HTMLImageElement>
	& ReactMarkdownProps;

const IMG_Builder = ({ src, height, width, className, alt = 'Logo' }: CustomImgComponentsProps) => {
	let props = {
		height,
		width,
		style: { verticalAlign: 'middle', marginRight: '0' },
		layout: 'raw',
		className,
		src,
		alt,
		priority: true
	} as ImageProps;

	if (className === 'img-logo-discord') {
		props = {
			...props,
			height: 25,
			width: 25,
			style: { verticalAlign: 'middle', marginRight: '2px' },
			alt: alt || 'Logo Discord'
		}
	} else if (className === 'img-logo-ytb') {
		props = {
			...props,
			height: 25,
			width: 35,
			style: { verticalAlign: 'middle', marginRight: '2px' },
			alt: alt || 'Logo YouTube'
		}
	}

	return (
		<Image {...props} alt={props.alt} />
	);
}