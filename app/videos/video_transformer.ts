import { BaseTransformer } from '@adonisjs/core/transformers';

type Video = {
	id: string;
	title: string;
	thumbnail: string;
	description: string;
	url: string;
	publishedAt: string;
};

export default class VideoTransformer extends BaseTransformer<Video> {
	toObject() {
		return this.pick(this.resource, [
			'id',
			'title',
			'thumbnail',
			'description',
			'url',
			'publishedAt',
		]);
	}
}
