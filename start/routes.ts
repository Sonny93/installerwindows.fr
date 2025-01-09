import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

const HomeController = () => import('#controllers/home_controller');
const VideosController = () => import('#controllers/videos_controller');
const AuthController = () => import('#controllers/auth_controller');

router.get('/', [HomeController, 'render']).as('home');
router.get('/videos/:videoId?', [VideosController, 'index']).as('videos');

const ROUTES_PREFIX = '/auth';

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
	.prefix(ROUTES_PREFIX);
