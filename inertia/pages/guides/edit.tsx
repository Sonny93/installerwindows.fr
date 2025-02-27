import { Guide } from '#shared/types/index';
import { ReactNode } from 'react';
import { GuideForm } from '~/components/guides/guide_form';
import FormLayout from '~/layouts/form_layout';

interface EditGuidesProps {
	guide: Guide;
}
const EditGuides = ({ guide }: EditGuidesProps) => (
	<GuideForm
		title="Modifier un guide"
		formUrl={`/guides/${guide.slug}`}
		formMethod="put"
		values={{
			title: guide.title,
			thumbnail: guide.thumbnail,
			githubUrl: guide.githubRawUrl,
			slug: guide.slug,
		}}
	/>
);

EditGuides.layout = (page: ReactNode) => <FormLayout>{page}</FormLayout>;
export default EditGuides;
