import { type Chapter } from '@/shared/types';
import { slugify } from '@/shared/utils';
import { Link } from '@inertiajs/react';
import { Title, TitleOrder } from '@mantine/core';
import { ClassAttributes, useEffect } from 'react';
import { ExtraProps } from 'react-markdown';

type CustomTitleComponentsProps = ClassAttributes<HTMLHeadingElement> &
	ExtraProps & {
		addChapter: ({ id, name }: Chapter) => void;
		children: string;
	};

export const MarkdownTitleBuilder = (args: any) => (
	<MarkdownTitle addChapter={() => {}} {...args} />
);

export function MarkdownTitle({
	children,
	addChapter,
	node,
}: CustomTitleComponentsProps) {
	const texts = node?.children
		? node?.children
				.filter((e) => e.type === 'text')
				.map((e) => e.value)
				.join(' ')
		: children.toString();
	const id = slugify(texts);

	useEffect(() => addChapter({ id, name: texts }));

	const titleOrder = Number(node?.tagName.toLowerCase().replace('h', '')) ?? 1;
	return (
		<Title component={Link} order={titleOrder as TitleOrder} id={id}>
			<Link href={`#${id}`}>{children}</Link>
		</Title>
	);
}
