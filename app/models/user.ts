import { UserSchema } from '#database/schema';
import { computed } from '@adonisjs/lucid/orm';

export default class User extends UserSchema {
	@computed()
	get fullname() {
		return this.nickName || this.name;
	}
}
