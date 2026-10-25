import Factory from '@adonisjs/lucid/factories';

import { slugify } from '#libs/slugify';
import Guide from '#models/guide';

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
