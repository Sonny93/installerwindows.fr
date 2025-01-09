import { TocItem } from '#shared/types/index';
import {
	Anchor,
	Box,
	Flex,
	Stack,
	Title,
	TypographyStylesProvider,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import './markdown.css';

interface MarkdownProps {
	html: string;
	toc?: TocItem[];
}

export function MarkdownBuilder({ html, toc }: MarkdownProps) {
	const [activeId, setActiveId] = useState<string | null>(toc?.[0]?.id ?? null);

	useEffect(() => {
		if (!toc) return;
		const headings = toc.map((item) => document.getElementById(item.id));
		const handleScroll = () => {
			const visibleHeading = headings.find(
				(heading) =>
					heading &&
					heading.getBoundingClientRect().top >= 0 &&
					heading.getBoundingClientRect().top < window.innerHeight / 3
			);
			if (visibleHeading) {
				setActiveId(visibleHeading.id);
			}
		};

		document.addEventListener('scroll', handleScroll);

		return () => document.removeEventListener('scroll', handleScroll);
	}, [toc]);

	return (
		<Flex align="flex-start" gap="xl" w="100%">
			<TypographyStylesProvider
				style={{ width: 0, flex: 1, lineHeight: 1.5 }}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			{toc && (
				<Box
					style={{
						position: 'sticky',
						top: 60,
						width: '250px',
					}}
				>
					<Stack gap="xs">
						<Title order={3}>Sommaire</Title>
						{toc.map((item) => (
							<Anchor
								href={`#${item.id}`}
								c={activeId === item.id ? 'blue' : 'inherit'}
								style={{
									fontSize: 'var(--mantine-font-size-sm)',
								}}
								key={item.id}
							>
								{item.text}
							</Anchor>
						))}
					</Stack>
				</Box>
			)}
		</Flex>
	);
}
