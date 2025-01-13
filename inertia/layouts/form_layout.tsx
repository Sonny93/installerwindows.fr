import { Box, rem } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { FloatingNavbar } from '~/components/generics/floating_navbar';
import { Footer } from '~/components/generics/footer/footer';
import { BaseLayout } from './base_layout';

interface FormProps extends PropsWithChildren {}

const FormLayout = ({ children }: FormProps) => (
	<BaseLayout>
		<Layout>{children}</Layout>
	</BaseLayout>
);

export default FormLayout;

const Layout = ({ children }: FormProps) => (
	<>
		{/* Top navbar */}
		<FloatingNavbar />

		{/* Page content */}
		<Box
			style={{
				maxWidth: '100%',
				width: '800px',
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
