import { Data } from '@generated/data';
import { GuideCard } from '~/components/guides/card/guide_card';

interface GuideListProps {
	guides: Data.Guide[];
}

export const GuideList = ({ guides }: Readonly<GuideListProps>) => (
	<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{guides.map((guide) => (
			<GuideCard key={guide.id} guide={guide} />
		))}
	</div>
);
