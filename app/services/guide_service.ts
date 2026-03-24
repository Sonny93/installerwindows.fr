import Guide from '#models/guide';
import { validateAndTransformMarkdownUrl } from '#shared/utils/index';

type CrudGuideData = {
	title: string;
	thumbnail: string;
	githubUrl: string;
};

export class GuideService {
	/**
	 * Creates a guide, persisting the raw GitHub URL derived from the provided link.
	 * @param crud.title Guide title.
	 * @param crud.thumbnail Thumbnail image URL.
	 * @param crud.githubUrl Link to the file or repository on GitHub.
	 * @returns Newly created Guide record.
	 */
	async createGuide({ githubUrl, ...data }: CrudGuideData) {
		const githubRawUrl = validateAndTransformMarkdownUrl(githubUrl);
		return await Guide.create({
			...data,
			githubRawUrl,
		});
	}

	/**
	 * Finds a guide by its URL slug.
	 * @param slug Unique guide slug.
	 * @returns Matching guide or fails when no row exists.
	 */
	async getGuideBySlug(slug: string) {
		return await Guide.query().where('slug', slug).firstOrFail();
	}

	/**
	 * Lists all guides ordered from newest to oldest.
	 * @returns Collection of guides.
	 */
	async getAllGuides() {
		return await Guide.query().orderBy('created_at', 'desc');
	}

	/**
	 * Updates an existing guide and recomputes the raw GitHub URL from the given link.
	 * @param guide Guide model to update.
	 * @param crud.title New title.
	 * @param crud.thumbnail New thumbnail.
	 * @param crud.githubUrl New GitHub link.
	 * @returns Saved guide after merge.
	 */
	async updateGuide(guide: Guide, { githubUrl, ...data }: CrudGuideData) {
		const githubRawUrl = validateAndTransformMarkdownUrl(githubUrl);
		return await guide.merge({ ...data, githubRawUrl }).save();
	}

	/**
	 * Permanently deletes a guide from the database.
	 * @param guide Guide model to delete.
	 * @returns Result of the Lucid delete operation.
	 */
	async deleteGuide(guide: Guide) {
		return await guide.delete();
	}
}
