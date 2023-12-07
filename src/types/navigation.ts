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

export type ApplicationTabParamList = {
	Home: undefined;
	Create: undefined;
	Update: { productId: string };
	Reports: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;

export type ApplicationTabScreenProps =
	StackScreenProps<ApplicationTabParamList>;
