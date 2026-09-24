import { BaseTransformer } from '@adonisjs/core/transformers';

import type Guide from '#models/guide';
import { dateTimeSerializer } from '#libs/index';

export default class GuideTransformer extends BaseTransformer<Guide> {
	toObject() {
		return {
			...this.pick(this.resource, [
				'id',
				'title',
				'slug',
				'thumbnail',
				'githubRawUrl',
			]),
			createdAt: dateTimeSerializer(this.resource.createdAt),
			updatedAt: dateTimeSerializer(this.resource.updatedAt),
		};
	}
}
