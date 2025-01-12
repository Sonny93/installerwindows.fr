import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

const HomeController = () => import('#controllers/home_controller');
const VideosController = () => import('#controllers/videos_controller');
const AuthController = () => import('#controllers/auth_controller');
const GuidesController = () => import('#controllers/guides_controller');
const CreateGuidesController = () =>
	import('#controllers/create_guides_controller');

router.get('/', [HomeController, 'render']).as('home');
router.get('/videos/:videoId?', [VideosController, 'index']).as('videos');

router
	.group(() => {
		router
			.group(() => {
				router
					.get('/new', [CreateGuidesController, 'render'])
					.as('guides.create-view');
				router
					.post('/new', [CreateGuidesController, 'execute'])
					.as('guides.create');
			})
			.middleware([middleware.auth()]);
		router.get('/:guideId?', [GuidesController, 'index']).as('guides');
	})
	.prefix('/guides');

router
	.group(() => {
		/**
		 * Auth routes for unauthicated users
		 */
		router.group(() => {
			router.get('/login', [AuthController, 'discord']).as('auth.login');
			router
				.get('/callback', [AuthController, 'authCallback'])
				.as('auth.callback');
		});

		/**
		 * Routes for authenticated users
		 */
		router
			.group(() => {
				router.get('/logout', [AuthController, 'logout']).as('auth.logout');
			})
			.middleware([middleware.auth()]);
	})
	.prefix('/auth');
