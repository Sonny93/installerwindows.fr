import type { Data } from '#client/data.d';
import type User from '#models/user';
import UserTransformer from '#transformers/user_transformer';
import { BaseTransformer } from '@adonisjs/core/transformers';

export type UserAuth =
	| { isAuthenticated: true; user: Data.User }
	| { isAuthenticated: false; user: null };

export const guestAuth: UserAuth = {
	isAuthenticated: false,
	user: null,
};

export default class UserAuthTransformer extends BaseTransformer<User> {
	toObject(): UserAuth {
		const user = new UserTransformer(this.resource).toObject();

		return {
			isAuthenticated: true,
			user,
		};
	}
}
