import { inject } from '@adonisjs/core';
import { cuid } from '@adonisjs/core/helpers';
import drive from '@adonisjs/drive/services/main';

@inject()
export class ImageDownloadService {
	/**
	 * Download an image from a URL and store it with Drive
	 * @param imageUrl URL of the image to download
	 * @returns The path of the stored image or null in case of error
	 */
	async downloadImage(imageUrl: string): Promise<string> {
		const response = await fetch(imageUrl);

		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		const contentType = response.headers.get('content-type') || 'image/jpeg';
		const extension = contentType.split('/')[1] || 'jpg';

		const fileName = `${cuid()}.${extension}`;
		const filePath = `images/${fileName}`;

		const imageBuffer = await response.arrayBuffer();

		await drive.use().put(filePath, Buffer.from(imageBuffer));

		return `/cache/${filePath}`;
	}
}
