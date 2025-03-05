import router from '@adonisjs/core/services/router';

const PeriphsController = () =>
	import('#controllers/periphs/show_periph_categories_controller');

router
	.group(() => {
		router.get('/', [PeriphsController, 'index']).as('periphs');
	})
	.prefix('/periphs');
