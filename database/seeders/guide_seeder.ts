import { BaseSeeder } from '@adonisjs/lucid/seeders';

import { slugify } from '#libs/slugify';
import Guide from '#models/guide';

type GuideSeed = {
	title: string;
	thumbnail: string;
	githubRawUrl: string;
};

const GUIDES: readonly GuideSeed[] = [
	{
		title: 'Windows 11',
		thumbnail: 'https://i.imgur.com/fdHywvQ.png',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/windows_11/main/Guide/README.md',
	},
	{
		title: 'Optimisation',
		thumbnail: 'https://i.imgur.com/x5gEglh.png',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/windows_11/main/Optis/README.md',
	},
	{
		title: 'Annuler les tweaks Windows 11',
		thumbnail: 'https://i.imgur.com/oHj2StD.png',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/windows_11/main/Optis/Annuler.md',
	},
	{
		title: 'Passer Windows de MBR en GPT',
		thumbnail: 'https://i.imgur.com/wJhjMqc.png',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/windows_11/main/others/UEFI.md',
	},
	{
		title: 'Sauvegarder son PC',
		thumbnail: 'https://i.imgur.com/9BEcPIw.png',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/Backup-logiciels/main/README.md',
	},
	{
		title: 'Installer ses pilotes avec SDI Origin',
		thumbnail: 'https://i.imgur.com/s1AFiVb.png',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/windows_11/main/others/SDIO.md',
	},
	{
		title: 'Régler les problèmes de crash de CG',
		thumbnail: 'https://i.imgur.com/hgSO5VV.png',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/windows_11/main/others/gpu_crash.md',
	},
	{
		title: 'Désactiver les pubs de Windows 11',
		thumbnail: 'https://i.imgur.com/FQGyD5F.png',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/windows_11/main/others/windows_ads.md',
	},
	{
		title: '5080',
		thumbnail: 'https://i.imgur.com/jjevoYs.png',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/windows_11/main/others/5080.md',
	},
	{
		title: 'Logiciels utiles',
		thumbnail: 'https://i.redd.it/hwtioswoamne1.jpeg',
		githubRawUrl:
			'https://raw.githubusercontent.com/Piwielle/windows_11/main/others/logiciels.md',
	},
];

export default class extends BaseSeeder {
	static environment = ['development'];

	async run() {
		const guides = GUIDES.map((guide) => ({
			...guide,
			slug: slugify(guide.title),
		}));
		await Guide.createMany(guides);
	}
}
