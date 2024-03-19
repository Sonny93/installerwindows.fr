import Link from 'next/link';
import { ClassAttributes, useEffect } from 'react';
import { ExtraProps } from 'react-markdown';

import { slugify } from 'utils/string';

type CustomTitleComponentsProps = ClassAttributes<HTMLHeadingElement> &
  ExtraProps & {
    addChapter: ({ id, name }: Chapter) => void;
    children: string;
  };

export default function MarkdownTitle({ children, addChapter, node }: CustomTitleComponentsProps) {
  const texts = children
    .split(' ')
    .filter((item) => typeof item === 'string')
    .join(' ');
  const id = slugify(texts);

  useEffect(() => addChapter({ id, name: texts }));

  const Title = node.tagName as keyof JSX.IntrinsicElements;
  return (
    <Title id={id}>
      <Link className="reset" href={`#${id}`}>
        {children}
      </Link>
    </Title>
  );
}
