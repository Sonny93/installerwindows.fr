import { TocItem } from '#shared/types/index';
import { transformRawToGithubUrl } from '#shared/utils/index';
import {
	Box,
	Button,
	Flex,
	Group,
	Text,
	TypographyStylesProvider,
} from '@mantine/core';
import cx from 'clsx';
import { useEffect, useState } from 'react';
import { TbListSearch } from 'react-icons/tb';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import './markdown.css';
import classes from './markdown_toc.module.css';

interface MarkdownProps {
	html: string;
	toc?: TocItem[];
	githubRawUrl?: string;
}

export function MarkdownBuilder({ html, toc, githubRawUrl }: MarkdownProps) {
	const [activeId, setActiveId] = useState<string | null>(toc?.[0]?.id ?? null);

	useEffect(() => {
		if (!toc) return;
		const headings = toc.map((item) => document.getElementById(item.id));

		const handleScroll = () => {
			let currentActiveId = null;

			for (let i = 0; i < headings.length; i++) {
				const heading = headings[i];
				if (heading) {
					const { top, bottom } = heading.getBoundingClientRect();

					if (bottom > 0 && top < window.innerHeight) {
						currentActiveId = heading.id;
						break;
					}
				}
			}

			if (currentActiveId !== activeId) {
				setActiveId(currentActiveId);
			}
		};

		document.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => document.removeEventListener('scroll', handleScroll);
	}, [toc, activeId]);

	const items = toc?.map((item) => (
		<Box<'a'>
			component="a"
			href={`#${item.id}`}
			key={item.id}
			className={cx(classes.link, {
				[classes.linkActive]: activeId === item.id,
			})}
			style={{ paddingLeft: 'var(--mantine-spacing-md)' }}
		>
			{item.text}
		</Box>
	));

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
						top: 75,
						width: '250px',
					}}
				>
					<Group mb="md">
						<TbListSearch size={18} />
						<Text>Table des matières</Text>
					</Group>
					{items}
					{githubRawUrl && (
						<Group mt="md">
							<Button
								variant="outline"
								size="xs"
								fullWidth
								component={ExternalLinkUnstyled}
								href={transformRawToGithubUrl(githubRawUrl)}
							>
								Contribuer
							</Button>
						</Group>
					)}
				</Box>
			)}
		</Flex>
	);
}
