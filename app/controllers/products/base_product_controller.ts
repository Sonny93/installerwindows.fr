import { ProductRepository } from '#repositories/product_repository.ts';
import { ProductType } from '#shared/types/index';
import {
	earphoneValidator,
	headsetValidator,
	keyboardValidator,
	microphoneValidator,
	monitorValidator,
	mousePadValidator,
	mouseValidator,
} from '#validators/product';
import { VineValidator } from '@vinejs/vine';

type SupportedProductType =
	| 'mouse'
	| 'keyboard'
	| 'monitor'
	| 'headset'
	| 'earphone'
	| 'microphone'
	| 'mousepad';

export class BaseProductController {
	private validators: Record<SupportedProductType, VineValidator<any, any>> = {
		mouse: mouseValidator,
		keyboard: keyboardValidator,
		monitor: monitorValidator,
		headset: headsetValidator,
		earphone: earphoneValidator,
		microphone: microphoneValidator,
		mousepad: mousePadValidator,
	};

	constructor(protected productRepository: ProductRepository) {}

	protected isSupportedProductType(
		productType: ProductType
	): productType is SupportedProductType {
		return Object.keys(this.validators).includes(productType);
	}

	protected getValidator(productType: ProductType) {
		return this.validators[productType];
	}

	protected getRepositoryGetByIdMethod(productType: ProductType) {
		const methods = {
			mouse: this.productRepository.getMouseById,
			keyboard: this.productRepository.getKeyboardById,
			monitor: this.productRepository.getMonitorById,
			headset: this.productRepository.getHeadsetById,
			earphone: this.productRepository.getEarphoneById,
			microphone: this.productRepository.getMicrophoneById,
			mousepad: this.productRepository.getMousePadById,
		};

		const method = methods[productType];
		if (!method) {
			throw new Error('Product type not supported');
		}

		return method.bind(this.productRepository);
	}

	protected getRepositoryCreateMethod(productType: ProductType) {
		const methods = {
			mouse: this.productRepository.createMouse,
			keyboard: this.productRepository.createKeyboard,
			monitor: this.productRepository.createMonitor,
			headset: this.productRepository.createHeadset,
			earphone: this.productRepository.createEarphone,
			microphone: this.productRepository.createMicrophone,
			mousepad: this.productRepository.createMousepad,
		};

		const method = methods[productType];
		if (!method) {
			throw new Error('Product type not supported');
		}

		return method.bind(this.productRepository);
	}

	protected getRepositoryUpdateMethod(productType: ProductType) {
		const methods = {
			mouse: this.productRepository.updateMouse,
			keyboard: this.productRepository.updateKeyboard,
			monitor: this.productRepository.updateMonitor,
			headset: this.productRepository.updateHeadset,
			earphone: this.productRepository.updateEarphone,
			microphone: this.productRepository.updateMicrophone,
			mousepad: this.productRepository.updateMousepad,
		};

		const method = methods[productType];
		if (!method) {
			throw new Error('Product type not supported');
		}

		return method.bind(this.productRepository);
	}
}
