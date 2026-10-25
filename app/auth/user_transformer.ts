import { BaseTransformer } from '@adonisjs/core/transformers';

import { dateTimeSerializer } from '#libs/date_time_serializer';
import type User from '#models/user';

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
