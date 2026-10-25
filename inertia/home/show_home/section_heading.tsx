import type { ReactNode } from 'react';

interface SectionHeadingProps {
	id: string;
	children: ReactNode;
}

export const SectionHeading = ({
	id,
	children,
}: Readonly<SectionHeadingProps>) => (
	<h2
		id={id}
		className="text-2xl font-normal tracking-tight text-gray-900 md:text-3xl dark:text-gray-100"
	>
		{children}
	</h2>
);
