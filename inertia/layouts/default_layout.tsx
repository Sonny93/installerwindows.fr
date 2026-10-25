import { PageShell } from '~/layouts/page_shell';

export const DefaultLayout = ({ children }: React.PropsWithChildren) => (
	<PageShell contentMaxWidth="1500px">{children}</PageShell>
);
