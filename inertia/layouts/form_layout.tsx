import type { PropsWithChildren } from 'react';

import { PageShell } from '~/layouts/page_shell';

export const FormLayout = ({ children }: Readonly<PropsWithChildren>) => (
	<PageShell contentMaxWidth="800px">{children}</PageShell>
);
