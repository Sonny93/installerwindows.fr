import { ReactNode } from 'react';
import { GuideForm } from '~/components/guides/guide_form';
import FormLayout from '~/layouts/form_layout';

const CreateGuides = () => (
	<GuideForm title="Ajouter un guide" formUrl="/guides/new" />
);

CreateGuides.layout = (page: ReactNode) => <FormLayout>{page}</FormLayout>;
export default CreateGuides;
