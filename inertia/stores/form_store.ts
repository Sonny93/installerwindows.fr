import { create } from 'zustand';
import { BaseProductFormData } from '~/components/products/form/product_form';

type FormStore<T> = {
	data: T;
	setData: (data: T) => void;
	handleTextChange: (field: keyof T, value: string) => void;
	handleNumberChange: (field: keyof T, value: number | string) => void;
	handleSelectChange: (field: keyof T, value: string | null) => void;
	handleMultiSelectChange: (field: keyof T, value: string[]) => void;
	handleBooleanChange: (field: keyof T, value: boolean) => void;
	reset: () => void;
};

const baseProductFormState: BaseProductFormData = {
	brand: '',
	reference: '',
	recommendedPrice: 0,
	additionalInfo: '',
	affiliateLinks: [],
	reviews: [],
};

export const createFormStore = <T extends object>(initialData: Partial<T>) =>
	create<FormStore<T>>((set) => ({
		data: { ...baseProductFormState, ...initialData } as T,
		setData: (data: T) => set({ data }),
		handleTextChange: (field: keyof T, value: string) =>
			set((state) => ({
				data: { ...state.data, [field]: value },
			})),
		handleNumberChange: (field: keyof T, value: number | string) =>
			set((state) => ({
				data: { ...state.data, [field]: Number(value) },
			})),
		handleSelectChange: (field: keyof T, value: string | null) =>
			set((state) => ({
				data: { ...state.data, [field]: value ?? '' },
			})),
		handleMultiSelectChange: (field: keyof T, value: string[]) =>
			set((state) => ({
				data: { ...state.data, [field]: value },
			})),
		handleBooleanChange: (field: keyof T, value: boolean) =>
			set((state) => ({
				data: { ...state.data, [field]: value },
			})),
		reset: () =>
			set({ data: { ...baseProductFormState, ...initialData } as T }),
	}));
