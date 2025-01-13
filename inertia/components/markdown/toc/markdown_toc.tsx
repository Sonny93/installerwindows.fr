import { transformRawToGithubUrl } from '#shared/utils/index';
import {
	Box,
	Button,
	Drawer,
	Group,
	Portal,
	rem,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useHeadroom, useMediaQuery } from '@mantine/hooks';
import cx from 'clsx';
import { useEffect, useState } from 'react';
import { TbListSearch } from 'react-icons/tb';
import { ExternalLinkUnstyled } from '~/components/generics/links/external_link_unstyled';
import { GuideTocControls } from '~/components/guides/guide_toc_controls';
import { MarkdownBuilderProps } from '~/components/markdown/builder/markdown_builder';
import useUser from '~/hooks/use_user';
import classes from './markdown_toc.module.css';

interface MarkdownTocProps extends Omit<MarkdownBuilderProps, 'html'> {}

export function MarkdownToc({ toc, slug, githubRawUrl }: MarkdownTocProps) {
	const { isAuthenticated } = useUser();
	const theme = useMantineTheme();
	const [opened, handler] = useDisclosure(false);
	const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const pinned = useHeadroom({ fixedAt: 120 });
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
			onClick={handler.close}
			style={{ paddingLeft: 'var(--mantine-spacing-md)' }}
		>
			{item.text}
		</Box>
	));

	const tocHeader = (
		<Group>
			<TbListSearch size={18} />
			<Text>Table des matières</Text>
		</Group>
	);
	return (
		<>
			{!isMobile && (
				<Box
					style={{
						position: 'sticky',
						top: 75,
						width: '250px',
					}}
				>
					<Box mb="md">{tocHeader}</Box>
					{items}
					{githubRawUrl && (
						<Group mt="md" gap="xs">
							<Button
								variant="outline"
								size="xs"
								fullWidth
								component={ExternalLinkUnstyled}
								href={transformRawToGithubUrl(githubRawUrl)}
							>
								Contribuer
							</Button>
							{isAuthenticated && slug && <GuideTocControls slug={slug} />}
						</Group>
					)}
				</Box>
			)}
			<Drawer opened={opened} onClose={handler.close} title={tocHeader}>
				{items}
			</Drawer>
			<Portal>
				<Button
					onClick={handler.open}
					variant="outline"
					size="xs"
					style={{
						position: 'fixed',
						left: '50%',
						bottom: pinned ? rem(16) : rem(-100),
						width: `calc(100% - ${rem(16)} * 2)`,
						backgroundColor: 'var(--mantine-color-body)',
						transition: 'all 0.2s ease-in-out',
						transform: 'translateX(-50%)',
					}}
				>
					<TbListSearch size={18} />
					<Text>Table des matières</Text>
				</Button>
			</Portal>
		</>
	);
}
