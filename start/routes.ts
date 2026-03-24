import { controllers } from '#generated/controllers';
import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

router.get('/', [controllers.Home, 'render']).as('home');
router
	.get('/videos/:videoId?', [controllers.ShowVideos, 'render'])
	.as('videos');
router.get('/cgu', [controllers.Cgu, 'render']).as('cgu');
router.get('/status', [controllers.HealthChecks, 'render']).as('status');

// redirect /guide/:slug to /guides/:slug
router.get('/guide/:slug', (ctx) =>
	ctx.response.redirect(`/guides/${ctx.params.slug}`)
);

router
	.group(() => {
		router
			.group(() => {
				router
					.get('/new', [controllers.guides.CreateGuides, 'render'])
					.as('guides.create-view');
				router
					.post('/new', [controllers.guides.CreateGuides, 'execute'])
					.as('guides.create');

				router
					.get('/edit/:slug', [controllers.guides.EditGuide, 'render'])
					.as('guides.edit-view');
				router
					.put('/:slug', [controllers.guides.EditGuide, 'execute'])
					.as('guides.edit');

				router
					.delete('/:slug', [controllers.guides.DeleteGuide, 'execute'])
					.as('guides.delete');
			})
			.middleware([middleware.auth()]);
		router.get('/', [controllers.guides.ShowGuides, 'render']).as('guides');
		router
			.get('/:guideSlug', [controllers.guides.ShowGuide, 'render'])
			.as('guides.show');
	})
	.prefix('/guides');

router
	.group(() => {
		/**
		 * Auth routes for unauthicated users
		 */
		router.group(() => {
			router.get('/login', [controllers.Auth, 'discord']).as('auth.login');
			router
				.get('/callback', [controllers.Auth, 'authCallback'])
				.as('auth.callback');
		});

		/**
		 * Routes for authenticated users
		 */
		router
			.group(() => {
				router.get('/logout', [controllers.Auth, 'logout']).as('auth.logout');
			})
			.middleware([middleware.auth()]);
	})
	.prefix('/auth');
