import Link from 'next/link';
import { ClassAttributes, useEffect } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import { slugify } from '../../../Utils';

type CustomTitleComponentsProps = ClassAttributes<HTMLHeadingElement> &
    ReactMarkdownProps & {
        level: any;
        addChapter: ({ id, name }: { id: string; name: string }) => void;
    };

export default function MarkdownTitle({ children, level, addChapter }: CustomTitleComponentsProps) {
    const texts = children.filter((item) => typeof item === 'string').join(' ');
    const id = slugify(texts);

    useEffect(() => addChapter({ id, name: texts }));

    const Title = `h${level}` as keyof JSX.IntrinsicElements;
    return (
        <Title style={{ cursor: 'pointer' }} id={id}>
            <Link className="reset" href={`#${id}`}>
                {children}
            </Link>
        </Title>
    );
}
