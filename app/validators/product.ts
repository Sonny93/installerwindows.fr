import { ProductType } from '#shared/types/index';
import vine from '@vinejs/vine';

export const productCategoryValidator = vine.compile(
	vine.object({
		params: vine.object({
			category: vine.enum(ProductType),
		}),
	})
);
