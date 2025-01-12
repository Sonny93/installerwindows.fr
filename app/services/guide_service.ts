import Guide from '#models/guide';
import { slugify, validateAndTransformMarkdownUrl } from '#shared/utils/index';

type CrudGuideData = {
	title: string;
	thumbnail: string;
	githubUrl: string;
};

export class GuideService {
	async createGuide({ githubUrl, ...data }: CrudGuideData) {
		const githubRawUrl = validateAndTransformMarkdownUrl(githubUrl);
		const slug = slugify(data.title);
		return await Guide.create({
			...data,
			slug,
			githubRawUrl,
		});
	}

	async getGuideBySlug(slug: string) {
		return await Guide.query().where('slug', slug).firstOrFail();
	}

	async getAllGuides() {
		return await Guide.query().orderBy('created_at', 'desc');
	}

	async updateGuide(guide: Guide, { githubUrl, ...data }: CrudGuideData) {
		const githubRawUrl = validateAndTransformMarkdownUrl(githubUrl);
		const slug = slugify(data.title);
		return await guide.merge({ ...data, slug, githubRawUrl }).save();
	}

	async deleteGuide(guide: Guide) {
		return await guide.delete();
	}
}
