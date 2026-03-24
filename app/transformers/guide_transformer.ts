import { dateTimeSerializer } from '#libs/index';
import type Guide from '#models/guide';
import { BaseTransformer } from '@adonisjs/core/transformers';

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
