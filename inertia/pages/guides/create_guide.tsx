import { ReactNode } from 'react';

import { urlFor } from '~/shared/lib/url_for';
import { FormLayout } from '~/layouts/form_layout';
import { GuideForm } from '~/guides/shared/guide_form';

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
