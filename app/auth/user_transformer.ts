import { BaseTransformer } from '@adonisjs/core/transformers';

import type User from '#models/user';
import { dateTimeSerializer } from '#libs/date_time_serializer';

export default class UserTransformer extends BaseTransformer<User> {
	toObject() {
		return {
			id: this.resource.id,
			fullname: this.resource.fullname,
			avatarUrl: this.resource.avatarUrl,
			createdAt: dateTimeSerializer(this.resource.createdAt),
			updatedAt: dateTimeSerializer(this.resource.updatedAt),
		};
	}
}
