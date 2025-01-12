import { Box, rem } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { FloatingNavbar } from '~/components/generics/floating_navbar';
import { Footer } from '~/components/generics/footer/footer';
import { BaseLayout } from './base_layout';

const DefaultLayout = ({ children }: PropsWithChildren) => (
	<BaseLayout>
		<Layout>{children}</Layout>
	</BaseLayout>
);

export default DefaultLayout;

const Layout = ({ children }: PropsWithChildren) => (
	<>
		{/* Top navbar */}
		<FloatingNavbar />

		{/* Page content */}
		<Box
			style={{
				maxWidth: '100%',
				width: '1500px',
				margin: '0 auto',
				marginBlock: rem(60),
				flex: 1,
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
