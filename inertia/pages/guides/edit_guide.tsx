import type { Data } from '@generated/data';
import type { ReactNode } from 'react';

import { GuideForm } from '~/guides/shared/guide_form';
import { FormLayout } from '~/layouts/form_layout';
import { urlFor } from '~/shared/lib/url_for';

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
