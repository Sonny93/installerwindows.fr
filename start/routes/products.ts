import router from '@adonisjs/core/services/router';

const ProductsController = () =>
	import('#controllers/products/show_product_categories_controller');

router
	.group(() => {
		router.get('', [ProductsController, 'render']).as('products.categories');
		router
			.get('/:category', [ProductsController, 'categoryRender'])
			.as('products.category');
	})
	.prefix('/periphs');
