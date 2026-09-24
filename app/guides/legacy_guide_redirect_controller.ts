import type { HttpContext } from '@adonisjs/core/http';

/**
 * Redirects the old `/guide/:guideSlug` singular URL to the current
 * `/guides/:guideSlug` route, keeping historical links working.
 */
export default class LegacyGuideRedirectController {
	render({ params, response }: HttpContext) {
		return response
			.redirect()
			.toRoute('guides.show_guide', { guideSlug: params.guideSlug });
	}
}
