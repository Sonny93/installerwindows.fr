import router from '@adonisjs/core/services/router';

const ProductsController = () =>
	import('#controllers/products/show_product_categories_controller');
const CreateProductController = () =>
	import('#controllers/products/create_product_controller');
const EditProductController = () =>
	import('#controllers/products/edit_product_controller');

router
	.group(() => {
		router.get('', [ProductsController, 'render']).as('products.categories');
		router
			.get('/:productType', [ProductsController, 'categoryRender'])
			.as('products.productType');

		router
			.get('/:productType/create', [CreateProductController, 'showForm'])
			.as('products.productType.create');
		router
			.post('/:productType/create', [CreateProductController, 'store'])
			.as('products.productType.create.store');

		router
			.get('/:productType/:id/edit', [EditProductController, 'showForm'])
			.as('products.productType.edit');
		router
			.put('/:productType/:id', [EditProductController, 'update'])
			.as('products.productType.update');
	})
	.prefix('/periphs');
