import { ReactNode } from 'react';

import { urlFor } from '~/lib/url_for';
import { FormLayout } from '~/layouts/form_layout';
import { GuideForm } from '~/components/guides/guide_form';

function CreateGuides() {
	return (
		<GuideForm
			title="Ajouter un guide"
			formUrl={urlFor('guides.create_guide.submit')}
		/>
	);
}

CreateGuides.layout = (page: ReactNode) => <FormLayout>{page}</FormLayout>;
export default CreateGuides;
