import AppLightModel from '#models/app_light_model';
import { AffiliateLink, Review } from '#shared/types/index';
import { column } from '@adonisjs/lucid/orm';

const jsonbSerialize = (value: unknown) => (Array.isArray(value) ? value : []);

export default class Product extends AppLightModel {
	@column()
	declare brand: string;

	@column()
	declare reference: string;

	@column()
	declare image: string | null;

	@column()
	declare recommendedPrice: number;

	@column()
	declare additionalInfo: string | null;

	@column({
		serialize: jsonbSerialize,
	})
	declare reviews: Review[];

	@column({
		serialize: jsonbSerialize,
	})
	declare affiliateLinks: AffiliateLink[];
}
