import { BaseLayout } from '~/layouts/base_layout';
import { Footer } from '~/layouts/footer/footer';
import { FloatingNavbar } from '~/layouts/navbar/floating_navbar';
import { SkipLink } from '~/layouts/skip_link';

const LAYOUT_MAX_WIDTH = '1500px';

interface PageShellProps {
	children: React.ReactNode;
	contentMaxWidth: string;
}

export const PageShell = ({
	children,
	contentMaxWidth,
}: Readonly<PageShellProps>) => (
	<BaseLayout>
		<SkipLink />
		<div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-800">
			<FloatingNavbar layoutMaxWidth={LAYOUT_MAX_WIDTH} />
			<div
				className="mx-auto w-full max-w-[1920px] flex-1 px-4 py-8 md:px-6"
				style={{ maxWidth: contentMaxWidth }}
				data-page-transition
			>
				<main
					id="main-content"
					tabIndex={-1}
					className="min-w-0 focus:outline-none"
				>
					{children}
				</main>
			</div>
			<Footer layoutMaxWidth={LAYOUT_MAX_WIDTH} />
		</div>
	</BaseLayout>
);
