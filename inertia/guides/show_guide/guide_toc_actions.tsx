import { GuideTocControls } from '~/guides/show_guide/guide_toc_controls';
import { useAuth } from '~/shared/hooks/use_auth';
import { ExternalLinkUnstyled } from '~/shared/links/external_link_unstyled';

const btnOutline =
	'inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:focus:ring-offset-gray-900';

interface GuideTocActionsProps {
	slug: string;
	githubUrl: string;
}

export function GuideTocActions({
	slug,
	githubUrl,
}: Readonly<GuideTocActionsProps>) {
	const { isAuthenticated } = useAuth();

	return (
		<>
			<ExternalLinkUnstyled href={githubUrl} className={btnOutline}>
				Contribuer
			</ExternalLinkUnstyled>
			{isAuthenticated ? (
				<div className="flex w-full flex-col gap-2">
					<GuideTocControls slug={slug} />
				</div>
			) : null}
		</>
	);
}
