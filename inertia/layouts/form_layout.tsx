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

const LAYOUT_WIDTH = '1500px';
const LAYOUT_CONTENT_WIDTH = '800px';
const Layout = ({ children }: FormProps) => (
	<>
		{/* Top navbar */}
		<FloatingNavbar width={LAYOUT_WIDTH} />

		{/* Page content */}
		<Box style={{ paddingInline: 'var(--mantine-spacing-lg)' }}>
			<Box
				style={{
					maxWidth: '100%',
					width: LAYOUT_CONTENT_WIDTH,
					marginInline: 'auto',
					marginBlock: rem(60),
					flex: 1,
				}}
			>
				{children}
			</Box>
		</Box>

		{/* Footer */}
		<Footer width={LAYOUT_WIDTH} />
	</>
);
