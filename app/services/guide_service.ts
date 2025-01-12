import Guide from '#models/guide';
import { getGithubRawUrl } from '#shared/utils/index';

type CrudGuideData = {
	title: string;
	slug: string;
	thumbnail: string;
	githubUrl: string;
};

export class GuideService {
	async createGuide({ githubUrl, ...data }: CrudGuideData) {
		const githubRawUrl = getGithubRawUrl(githubUrl);
		return await Guide.create({
			...data,
			githubRawUrl,
		});
	}

	async getGuideBySlug(slug: string) {
		return await Guide.query().where('slug', slug).firstOrFail();
	}

	async getAllGuides() {
		return await Guide.query().orderBy('created_at', 'desc');
	}

	async updateGuide(guide: Guide, data: CrudGuideData) {
		const githubRawUrl = getGithubRawUrl(data.githubUrl);
		return await guide.merge({ ...data, githubRawUrl }).save();
	}

	async deleteGuide(guide: Guide) {
		return await guide.delete();
	}
}
