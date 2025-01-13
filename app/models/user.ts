import AppBaseModel from '#models/app_base_model';
import type { DiscordToken } from '@adonisjs/ally/types';
import { column, computed } from '@adonisjs/lucid/orm';

export default class User extends AppBaseModel {
	@column({ serializeAs: null })
	declare name: string;

	@column({ serializeAs: null })
	declare nickName: string;

	@column()
	declare avatarUrl: string;

	@column({ serializeAs: null })
	declare token?: DiscordToken;

	@column({ serializeAs: null })
	declare providerId: number;

	@column({ serializeAs: null })
	declare providerType: 'discord';

	@computed()
	get fullname() {
		return this.nickName || this.name;
	}
}
