import Factory from '@adonisjs/lucid/factories';

import User from '#models/user';

export const UserFactory = Factory.define(User, ({ faker }) => {
	return {
		name: faker.internet.username(),
		nickName: null,
		avatarUrl: faker.image.avatar(),
		token: null,
		providerId: faker.string.numeric(18),
		providerType: 'discord',
	};
}).build();
