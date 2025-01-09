import router from '@adonisjs/core/services/router';
const HomeController = () => import('#controllers/home_controller');
const VideosController = () => import('#controllers/videos_controller');

router.get('/', [HomeController, 'render']);
router.get('/videos', [VideosController, 'index']);
