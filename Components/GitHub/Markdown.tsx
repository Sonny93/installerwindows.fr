import Image, { ImageProps } from 'next/future/image';
import Link from 'next/link';
import { AnchorHTMLAttributes, ClassAttributes, ImgHTMLAttributes } from 'react';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ReactMarkdownProps } from 'react-markdown/src/ast-to-react';

const DOMAIN_URL = 'https://installerwindows.fr';
const YOUTUBE_DOMAIN = 'https://www.youtube.com/';
const YOUTUBE_SHORT_DOMAIN = 'https://youtu.be/';

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
	const path = getPathFromUrl(href, DOMAIN_URL);
	if (path) {
		return (<>
			<Link href={path}>
				<a>{children}</a>
			</Link>
		</>);
	}

	const videoId = getVideoIdFromPath(
		getPathFromUrl(href, YOUTUBE_DOMAIN) ||
		getPathFromUrl(href, YOUTUBE_SHORT_DOMAIN)
	);
	if (videoId) {
		return (<>
			<Link href={`/videos/${videoId}`}>
				<a>{children}</a>
			</Link>
		</>);
	}

	return (<>
		<Link href={`/videos/${videoId}`}>
			<a href={href} target='_blank' rel='noreferrer'>
				{children}
			</a>
		</Link>
	</>);
}

function getPathFromUrl(url: string = null, domain: string = null) {
	if (!url || !domain) return url;
	const path = url.split(domain)[1];
	return path;
}

function getVideoIdFromPath(path: string = null) {
	if (!path) return path;
	const videoId = path.startsWith('watch?v=') ? path.split('watch?v=')[1] : path;
	return videoId;
}

type CustomImgComponentsProps = ClassAttributes<HTMLImageElement>
	& ImgHTMLAttributes<HTMLImageElement>
	& ReactMarkdownProps;

const IMG_Builder = ({ src, height, width, id, className, alt = 'Logo' }: CustomImgComponentsProps) => {
	let props = {
		height,
		width,
		style: { verticalAlign: 'middle', marginRight: '0' },
		layout: 'raw',
		className,
		src,
		alt,
		id,
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