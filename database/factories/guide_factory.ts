import Factory from '@adonisjs/lucid/factories';

import Guide from '#models/guide';
import { slugify } from '#libs/slugify';

export const GuideFactory = Factory.define(Guide, ({ faker }) => {
	const title = faker.lorem.sentence();
	return {
		title,
		slug: `${slugify(title)}-${faker.string.alphanumeric(6).toLowerCase()}`,
		thumbnail: faker.image.url(),
		githubRawUrl:
			'https://raw.githubusercontent.com/example-org/example-repo/main/README.md',
	};
}).build();
