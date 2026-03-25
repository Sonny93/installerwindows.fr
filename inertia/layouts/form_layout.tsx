import { PropsWithChildren } from 'react';
import { FloatingNavbar } from '~/components/generics/floating_navbar';
import { Footer } from '~/components/generics/footer/footer';
import { BaseLayout } from './base_layout';

const LAYOUT_MAX_WIDTH = '1500px';
const CONTENT_MAX_WIDTH = '800px';

export const FormLayout = ({ children }: Readonly<PropsWithChildren>) => (
	<BaseLayout>
		<div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-800">
			<FloatingNavbar layoutMaxWidth={LAYOUT_MAX_WIDTH} />
			<div
				className="mx-auto w-full max-w-[1920px] flex-1 px-4 py-6 md:px-6"
				style={{ maxWidth: CONTENT_MAX_WIDTH }}
				data-page-transition
			>
				<main className="min-w-0">{children}</main>
			</div>
			<Footer layoutMaxWidth={LAYOUT_MAX_WIDTH} />
		</div>
	</BaseLayout>
);
