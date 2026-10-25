import type { ReactNode } from 'react';

import { SectionHeading } from '~/home/show_home/section_heading';

interface WhyPointProps {
	iconClass: string;
	title: string;
	children: ReactNode;
}

const WhyPoint = ({ iconClass, title, children }: Readonly<WhyPointProps>) => (
	<div className="flex flex-col gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
		<h3 className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
			<span
				className={`${iconClass} size-5 shrink-0 text-blue-700 dark:text-blue-300`}
				aria-hidden="true"
			/>
			{title}
		</h3>
		<p className="text-pretty text-gray-600 dark:text-gray-400">{children}</p>
	</div>
);

export const HomeWhySection = () => (
	<section aria-labelledby="why-heading" className="flex flex-col gap-6">
		<SectionHeading id="why-heading">Pourquoi ce guide</SectionHeading>
		<div className="grid gap-8 md:grid-cols-2 md:gap-12">
			<WhyPoint iconClass="i-tabler-alert-triangle" title="Le constat">
				Il existe énormément de tweaks, optimisations, tutoriels, scripts et
				logiciels qui promettent d'améliorer les performances, réduire la
				latence ou stabiliser les FPS. La majorité sont faux, vieux ou
				dangereux&nbsp;: ils n'améliorent rien et peuvent endommager votre PC.
			</WhyPoint>
			<WhyPoint iconClass="i-tabler-circle-check" title="La méthode">
				Ce guide propose une méthode simple et efficace pour obtenir un PC
				performant et optimisé, où tout continue de fonctionner. En le suivant,
				vous aurez effectué 99&nbsp;% de ce qui est possible en termes
				d'optimisation.
			</WhyPoint>
		</div>
	</section>
);
