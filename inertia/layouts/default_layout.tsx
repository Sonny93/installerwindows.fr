import { FloatingNavbar } from '~/components/generics/floating_navbar';
import { Footer } from '~/components/generics/footer/footer';
import { BaseLayout } from '~/layouts/base_layout';

const LAYOUT_MAX_WIDTH = '1500px';

export const DefaultLayout = ({ children }: React.PropsWithChildren) => (
	<BaseLayout>
		<div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-800">
			<FloatingNavbar layoutMaxWidth={LAYOUT_MAX_WIDTH} />
			<div
				className="mx-auto w-full max-w-[1920px] flex-1 px-4 py-8 md:px-6"
				style={{ maxWidth: LAYOUT_MAX_WIDTH }}
			>
				<main className="min-w-0">{children}</main>
			</div>
			<Footer layoutMaxWidth={LAYOUT_MAX_WIDTH} />
		</div>
	</BaseLayout>
);
