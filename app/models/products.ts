import AppLightModel from '#models/app_light_model';
import { AffiliateLink, Review } from '#shared/types/index';
import { column } from '@adonisjs/lucid/orm';
import { Attachment, attachment } from '@jrmc/adonis-attachment';

const jsonbSerialize = (value: unknown) => (Array.isArray(value) ? value : []);

export default class Product extends AppLightModel {
	@column()
	declare brand: string;

	@column()
	declare reference: string;

	@attachment({
		folder: 'uploads/products',
		preComputeUrl: true,
	})
	declare thumbnail: Attachment;

	@column()
	declare recommendedPrice: number;

	@column()
	declare additionalInfo: string | null;

	@column({
		serialize: jsonbSerialize,
		prepare: (value) => JSON.stringify(value),
	})
	declare reviews: Review[];

	@column({
		serialize: jsonbSerialize,
		prepare: (value) => JSON.stringify(value),
	})
	declare affiliateLinks: AffiliateLink[];
}
