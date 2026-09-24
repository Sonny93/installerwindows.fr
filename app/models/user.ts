import { computed } from '@adonisjs/lucid/orm';

import { UserSchema } from '#database/schema';

export default class User extends UserSchema {
	@computed()
	get fullname() {
		return this.nickName ?? this.name;
	}
}
