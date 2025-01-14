import Guide from '#models/guide';
import { slugify } from '#shared/utils/index';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

const guideUrls = [
	'https://github.com/Piwielle/windows_11/blob/main/Guide/README.md',
	'https://github.com/Piwielle/windows_10/blob/master/README.md',
	'https://github.com/Piwielle/windows_11/blob/main/Optis/README.md',
	'https://github.com/Piwielle/windows_11/blob/main/Optis/Annuler.md',
	'https://github.com/Piwielle/windows_11/blob/main/others/UEFI.md',
	'https://github.com/Piwielle/Backup-logiciels/blob/main/README.md',
	'https://github.com/Piwielle/windows_11/blob/main/others/SDIO.md',
	'https://github.com/Piwielle/windows_11/blob/main/others/gpu_crash.md',
	'https://github.com/Piwielle/windows_11/blob/main/others/windows_ads.md',
];

export default class extends BaseSeeder {
	static environment = ['development'];

	async run() {
		const guides = guideUrls.map((url, index) => {
			const title = generateRandomSentence(10);
			return {
				title,
				slug: slugify(title),
				thumbnail: 'https://picsum.photos/350?random=' + index,
				githubRawUrl: url,
			};
		});
		console.log(guides);
		await Guide.createMany(guides);
	}
}

// function to generate random strings
function generateRandomSentence(wordCount: number): string {
	const words = [
		'the',
		'be',
		'to',
		'of',
		'and',
		'a',
		'in',
		'that',
		'have',
		'I',
		'it',
		'for',
		'not',
		'on',
		'with',
		'he',
		'as',
		'you',
		'do',
		'at',
		'this',
		'but',
		'his',
		'by',
		'from',
		'they',
		'we',
		'say',
		'her',
		'she',
		'or',
		'an',
		'will',
		'my',
		'one',
		'all',
		'would',
		'there',
		'their',
		'what',
	];

	let sentence = '';
	for (let i = 0; i < wordCount; i++) {
		const randomWord = words[Math.floor(Math.random() * words.length)];
		sentence += randomWord + (i < wordCount - 1 ? ' ' : '');
	}

	return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}
