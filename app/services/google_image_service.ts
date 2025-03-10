export class GoogleImageService {
	private readonly USER_AGENT =
		'Mozilla/4.0 (compatible; MSIE 6.0; X11; Linux i686) Opera 7.23';
	private readonly BASE_URL =
		'https://www.google.com/search?tbm=isch&safe=active';
	private readonly IMAGE_REGEX = /<img class="DS1iW" alt="" src="(.+?)&amp;s/;

	/**
	 * Get the first image found for a given search term
	 */
	async getFirstImage(...terms: string[]): Promise<string | null> {
		const searchTerms = terms.join(' ');
		try {
			const url = `${this.BASE_URL}&q=${encodeURIComponent(searchTerms)}`;
			const response = await fetch(url, {
				headers: {
					'User-Agent': this.USER_AGENT,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}

			const html = await response.text();
			const match = html.match(this.IMAGE_REGEX);

			return match ? match[1] : null;
		} catch (error) {
			console.error(`Error while searching for image "${searchTerms}":`, error);
			return null;
		}
	}
}
