import type { ReactNode } from 'react';

import type { TocItem } from '~/shared/markdown/toc/toc_item';

export interface MarkdownBuilderProps {
	html: string;
	toc?: TocItem[];
	actions?: ReactNode;
}
