import { ReactNode } from 'react';
import { Data } from '@generated/data';

import { urlFor } from '~/lib/url_for';
import { FormLayout } from '~/layouts/form_layout';
import { GuideForm } from '~/components/guides/guide_form';

interface EditGuidesProps {
	guide: Data.Guide;
}

function EditGuides({ guide }: Readonly<EditGuidesProps>) {
	return (
		<GuideForm
			title="Modifier un guide"
			formUrl={urlFor('guides.edit_guide.submit', { slug: guide.slug })}
			formMethod="put"
			values={{
				title: guide.title,
				thumbnail: guide.thumbnail,
				githubUrl: guide.githubRawUrl,
				slug: guide.slug,
			}}
		/>
	);
}

EditGuides.layout = (page: ReactNode) => <FormLayout>{page}</FormLayout>;
export default EditGuides;
