import Image, { ImageProps } from "next/image";
import Link from "next/link";
import {
    AnchorHTMLAttributes,
    ClassAttributes, ImgHTMLAttributes, RefObject, useEffect, useRef, useState
} from "react";

import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import rehypeRaw from "rehype-raw";

import styles from './markdown.module.scss';

const DOMAIN_URL = "https://installerwindows.fr";
const YOUTUBE_DOMAIN = "https://www.youtube.com/";
const YOUTUBE_SHORT_DOMAIN = "https://youtu.be/";

interface Chapter {
    name: string;
    ref: RefObject<HTMLHeadingElement>;
}

interface MarkdownProps {
    markdown: string;
    innerClassName?: string;
}
export default function Markdown({ markdown, innerClassName }: MarkdownProps) {
    const [chapters, setChapters] = useState<Chapter[]>([]);

    const addChapter = (newChapter: Chapter) => {
        setChapters((chapters) => {
            const chapter = chapters.find((c => c.name === newChapter.name));
            return chapter ? chapters : [...chapters, newChapter];
        });
    };

    const handleScrollToElement = (chapter: Chapter) => {
        console.log(chapter, { ref: chapter.ref.current });
        // chapter.ref.current.scrollIntoView();
    }

    const TitleBuilder = ({ children, level }) => {
        const ref = useRef<HTMLHeadingElement>(undefined);
        const text = children?.[0] as string;

        useEffect(() => {
            console.log('là', ref.current?.textContent);
            if (!ref.current?.textContent) {
                return;
            }
            setTimeout(() => {
                console.log({ current: ref.current });
                if (ref.current?.textContent === 'Bibliothèques C++') {
                    ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 1000);
            addChapter({ name: text, ref });
        }, [text]);

        return level === 1 ?
            <h1 ref={ref}>{text}</h1> :
            <h2 ref={ref}>{text}</h2>;
    }

    console.log(chapters);

    return (
        <div style={{ display: 'flex', gap: '15px' }}>
            <ul className={styles['chapters']}>
                {chapters.map((chapter, index) => (
                    <li key={index + 1} onClick={() => handleScrollToElement(chapter)}>
                        {chapter.name} <span className={styles['number']}>- {index + 1}</span>
                    </li>
                ))}
            </ul>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                linkTarget="_blank"
                components={{
                    a: A_Builder,
                    img: IMG_Builder,
                    h1: TitleBuilder,
                    h2: TitleBuilder
                }}
                className={innerClassName}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
}

type CustomAComponentsProps = ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> &
    ReactMarkdownProps;

function A_Builder({ href, children }: CustomAComponentsProps) {
    const path = getPathFromUrl(href, DOMAIN_URL);
    if (path) {
        return (
            <Link href={path}>
                {children}
            </Link>
        );
    }

    const videoId = getVideoIdFromPath(
        getPathFromUrl(href, YOUTUBE_DOMAIN) ||
        getPathFromUrl(href, YOUTUBE_SHORT_DOMAIN)
    );
    if (videoId) {
        return (
            <Link href={`/videos/${videoId}`}>
                {children}
            </Link>
        );
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
    const videoId = path.startsWith("watch?v=")
        ? path.split("watch?v=")[1]
        : path;
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
    alt = "Logo",
}: CustomImgComponentsProps) {
    let props = {
        height,
        width,
        style: { verticalAlign: "middle", marginRight: "0" },
        layout: "raw",
        className,
        src,
        alt,
        id,
        priority: true,
    } as ImageProps;

    if (className === "img-logo-discord") {
        props = {
            ...props,
            height: 25,
            width: 25,
            style: { verticalAlign: "middle", marginRight: "2px" },
            alt: alt || "Logo Discord",
        };
    } else if (className === "img-logo-ytb") {
        props = {
            ...props,
            height: 25,
            width: 35,
            style: { verticalAlign: "middle", marginRight: "2px" },
            alt: alt || "Logo YouTube",
        };
    }

    return (<Image {...props} alt={props.alt} />);
}
