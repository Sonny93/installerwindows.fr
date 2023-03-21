import Link from 'next/link';
import { AnchorHTMLAttributes, ClassAttributes } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

import { getPathFromUrl, getVideoIdFromPath } from '../../../Utils';

const DOMAIN_URL = 'https://installerwindows.fr';
const YOUTUBE_DOMAIN = 'https://www.youtube.com';
const YOUTUBE_SHORT_DOMAIN = 'https://youtu.be';

type CustomAComponentsProps = ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement> &
    ReactMarkdownProps;

export default function MarkdownLink({ href, children }: CustomAComponentsProps) {
    if (href.startsWith('javascript:')) {
        return <>{children}</>;
    }

    const path = getPathFromUrl(href, DOMAIN_URL) || href;
    if (path || href.startsWith('#')) {
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
