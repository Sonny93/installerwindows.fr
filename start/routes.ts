import router from '@adonisjs/core/services/router';
const HomeController = () => import('#controllers/home_controller');

router.get('/', [HomeController, 'render']);
