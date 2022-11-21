import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import {
    AnchorHTMLAttributes,
    ClassAttributes,
    ImgHTMLAttributes,
    useEffect,
    useState,
} from 'react';

import ReactMarkdown from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import rehypeRaw from 'rehype-raw';
import Chapters from './Chapters';

const DOMAIN_URL = 'https://installerwindows.fr';
const YOUTUBE_DOMAIN = 'https://www.youtube.com/';
const YOUTUBE_SHORT_DOMAIN = 'https://youtu.be/';

export interface Chapter {
    id: string;
    name: string;
}

interface MarkdownProps {
    markdown: string;
    innerClassName?: string;
}
export default function Markdown({ markdown, innerClassName }: MarkdownProps) {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    const addChapter = (newChapter: Chapter) => {
        setChapters((chapters) => {
            const chapter = chapters.find((c) => c.id === newChapter.id);
            return chapter ? chapters : [...chapters, newChapter];
        });
    };

    const TitleBuilder = ({ children, level }) => {
        const text = children?.[0] as string;
        const id = buildIdFromText(text);

        useEffect(() => addChapter({ id, name: text }));

        const Title = `h${level}` as keyof JSX.IntrinsicElements;
        return (
            <Title style={{ cursor: 'pointer' }} id={id}>
                <Link className='reset' href={`#${id}`}>{text}</Link>
            </Title>
        );
    };

    return (
        <div style={{ display: 'flex', gap: '15px' }}>
            {chapters.length > 0 && <Chapters chapters={chapters} />}
            <div className="markdown-content">
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    linkTarget="_blank"
                    components={{
                        a: A_Builder,
                        img: IMG_Builder,
                        h1: TitleBuilder,
                        h2: TitleBuilder,
                        h3: TitleBuilder,
                        h4: TitleBuilder,
                        h5: TitleBuilder,
                        h6: TitleBuilder,
                    }}
                    className={innerClassName}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        </div>
    );
}

function buildIdFromText(text: string) {
    return text.trim().toLowerCase().replace(' ', '+');
}

type CustomAComponentsProps = ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> &
    ReactMarkdownProps;

function A_Builder({ href, children }: CustomAComponentsProps) {
    const path = getPathFromUrl(href, DOMAIN_URL);
    if (path) {
        return <Link href={path}>{children}</Link>;
    }

    const videoId = getVideoIdFromPath(
        getPathFromUrl(href, YOUTUBE_DOMAIN) || getPathFromUrl(href, YOUTUBE_SHORT_DOMAIN)
    );
    if (videoId) {
        return <Link href={`/videos/${videoId}`}>{children}</Link>;
    }

    return (
        <Link href={href} target="_blank" rel="noreferrer">
            {children}
        </Link>
    );
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

type CustomImgComponentsProps = ClassAttributes<HTMLImageElement> &
    ImgHTMLAttributes<HTMLImageElement> &
    ReactMarkdownProps;

function IMG_Builder({
    src,
    height,
    width,
    id,
    className,
    alt = 'Logo',
}: CustomImgComponentsProps) {
    let props = {
        height,
        width,
        style: { verticalAlign: 'middle', marginRight: '0' },
        layout: 'raw',
        className,
        src,
        alt,
        id,
        priority: true,
    } as ImageProps;

    if (className === 'img-logo-discord') {
        props = {
            ...props,
            height: 25,
            width: 25,
            style: { verticalAlign: 'middle', marginRight: '2px' },
            alt: alt || 'Logo Discord',
        };
    } else if (className === 'img-logo-ytb') {
        props = {
            ...props,
            height: 25,
            width: 35,
            style: { verticalAlign: 'middle', marginRight: '2px' },
            alt: alt || 'Logo YouTube',
        };
    }

    return <Image {...props} alt={props.alt} />;
}
