import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	Example: undefined;
	'Create Product': undefined;
	'Update Product': { productId: string };
	'Product Details': { productId: string };
	'Create Supplier': undefined;
	'Update Supplier': { supplierId: string };
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;
