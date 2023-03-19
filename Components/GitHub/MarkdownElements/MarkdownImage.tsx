import Image, { ImageProps } from 'next/image';
import { ClassAttributes, ImgHTMLAttributes } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

type CustomImgComponentsProps = ClassAttributes<HTMLImageElement> &
    ImgHTMLAttributes<HTMLImageElement> &
    ReactMarkdownProps;

export default function MarkdownImage({
    src,
    height = 20,
    width = 20,
    id,
    className,
    alt = 'Logo',
}: CustomImgComponentsProps) {
    let props = {
        height,
        width,
        style: { verticalAlign: 'middle', marginRight: '0' },
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
