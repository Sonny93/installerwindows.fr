import Link from 'next/link';
import { ClassAttributes, createRef, useEffect, useRef } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

import { slugify } from '../../../utils/string';

type CustomTitleComponentsProps = ClassAttributes<HTMLHeadingElement> &
    ReactMarkdownProps & {
        level: number;
        addChapter: ({ id, name }: Chapter) => void;
    };

export default function MarkdownTitle({ children, level, addChapter }: CustomTitleComponentsProps) {
    const texts = children.filter((item) => typeof item === 'string').join(' ');
    const id = slugify(texts);

    useEffect(() => addChapter({ id, name: texts }));

    const Title = `h${level}` as keyof JSX.IntrinsicElements;
    return (
        <Title id={id}>
            <Link className="reset" href={`#${id}`}>
                {children}
            </Link>
        </Title>
    );
}
