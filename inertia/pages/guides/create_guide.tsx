import type { ReactNode } from 'react';

import { GuideForm } from '~/guides/shared/guide_form';
import { FormLayout } from '~/layouts/form_layout';
import { urlFor } from '~/shared/lib/url_for';

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
