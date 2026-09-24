import router from '@adonisjs/core/services/router';

import { middleware } from '#start/kernel';
import { controllers } from '#generated/controllers';

router.get('/', [controllers.home.ShowHome, 'render']).as('home.show_home');
router
	.get('/videos/:videoId?', [controllers.videos.ShowVideos, 'render'])
	.as('videos.show_videos');
router.get('/cgu', [controllers.cgu.ShowCgu, 'render']).as('cgu.show_cgu');
router
	.get('/status', [controllers.status.ShowStatus, 'render'])
	.as('status.show_status');

router.get('/guide/:guideSlug', [
	controllers.guides.LegacyGuideRedirect,
	'render',
]);

router
	.group(() => {
		router
			.group(() => {
				router
					.get('/new', [controllers.guides.CreateGuide, 'render'])
					.as('guides.create_guide');
				router
					.post('/new', [controllers.guides.CreateGuide, 'execute'])
					.as('guides.create_guide.submit');

				router
					.get('/edit/:slug', [controllers.guides.EditGuide, 'render'])
					.as('guides.edit_guide');
				router
					.put('/:slug', [controllers.guides.EditGuide, 'execute'])
					.as('guides.edit_guide.submit');

				router
					.delete('/:slug', [controllers.guides.DeleteGuide, 'execute'])
					.as('guides.delete_guide');
			})
			.middleware([middleware.auth()]);
		router
			.get('/', [controllers.guides.ShowGuides, 'render'])
			.as('guides.show_guides');
		router
			.get('/:guideSlug', [controllers.guides.ShowGuide, 'render'])
			.as('guides.show_guide');
	})
	.prefix('/guides');

router
	.group(() => {
		/**
		 * Auth routes for unauthicated users
		 */
		router.group(() => {
			router.get('/login', [controllers.auth.Login, 'render']).as('auth.login');
			router
				.get('/callback', [controllers.auth.DiscordCallback, 'render'])
				.as('auth.discord_callback');
		});

		/**
		 * Routes for authenticated users
		 */
		router
			.group(() => {
				router
					.post('/logout', [controllers.auth.Logout, 'execute'])
					.as('auth.logout');
			})
			.middleware([middleware.auth()]);
	})
	.prefix('/auth');
