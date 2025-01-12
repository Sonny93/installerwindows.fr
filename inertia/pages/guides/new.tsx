import { ReactNode } from 'react';
import { Form } from '~/components/generics/form';
import FormLayout from '~/layouts/form_layout';

function CreateGuides() {
	return (
		<Form
			title="Ajouter un guide"
			formUrl="/guides/new"
			formMethod="post"
			fields={[
				{ label: 'Titre', name: 'title' },
				{
					label: 'Lien image',
					description: "Pas de restriction sur la provenance de l'image",
					name: 'thumbnail',
				},
				{
					label: 'Lien Github',
					description:
						'Les domaines github.com ou raw.githubusercontent.com sont acceptés',
					name: 'githubUrl',
				},
			]}
		/>
	);
}

CreateGuides.layout = (page: ReactNode) => <FormLayout>{page}</FormLayout>;
export default CreateGuides;
