import { Box, rem } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { FloatingNavbar } from '~/components/generics/floating_navbar';
import { BaseLayout } from './base_layout';
import { Footer } from '~/components/generics/footer/footer';

const VideosLayout = ({ children }: PropsWithChildren) => (
	<BaseLayout>
		<Layout>{children}</Layout>
	</BaseLayout>
);

export default VideosLayout;

const Layout = ({ children }: PropsWithChildren) => (
	<>
		{/* Top navbar */}
		<FloatingNavbar />

		{/* Page content */}
		<Box
			style={{
				minHeight: '100vh',
				maxWidth: '100%',
				width: '1500px',
				margin: '0 auto',
				marginBlock: rem(60),
				display: 'flex',
			}}
		>
			{/* Content */}
			<Box
				style={{
					height: '100%',
					width: '100%',
					flex: 1,
					paddingInline: 'var(--mantine-spacing-lg)',
				}}
			>
				{children}
			</Box>
		</Box>

		{/* Footer */}
		<Footer />
	</>
);
