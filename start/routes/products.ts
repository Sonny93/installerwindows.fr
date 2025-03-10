import router from '@adonisjs/core/services/router';

const ProductsController = () =>
	import('#controllers/products/show_product_categories_controller');
const CreateProductController = () =>
	import('#controllers/products/create_product_controller');

router
	.group(() => {
		router.get('', [ProductsController, 'render']).as('products.categories');
		router
			.get('/:category', [ProductsController, 'categoryRender'])
			.as('products.category');

		router
			.get('/create/mouse', [CreateProductController, 'showMouseForm'])
			.as('products.create.mouse');
		router
			.post('/create/mouse', [CreateProductController, 'storeMouse'])
			.as('products.create.mouse.store');
	})
	.prefix('/periphs');
