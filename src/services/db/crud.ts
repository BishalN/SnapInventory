import { localDb as db } from './singleton';
import { Product } from './models';

export type ProductDoc = PouchDB.Core.ExistingDocument<Product>;
export type CreateProductInput = Omit<Product, '_rev'>;

export const createProduct = async (product: CreateProductInput) => {
	try {
		const response = await db.put(product);
		console.log('Product created successfully:', response);
		return response;
	} catch (error) {
		console.error('Error creating product:', error);
		throw error;
	}
};

export const getProduct = async (productId: string) => {
	try {
		const product = await db.get<Product>(productId);
		console.log('Product retrieved successfully:', product);
		return product;
	} catch (error) {
		console.error('Error retrieving product:', error);
		throw error;
	}
};

export const updateProduct = async (product: Product) => {
	try {
		const response = await db.put(product);
		console.log('Product updated successfully:', response);
		return response;
	} catch (error) {
		console.error('Error updating product:', error);
		throw error;
	}
};

export const deleteProduct = async (productId: string) => {
	try {
		const product = await db.get<Product>(productId);
		const response = await db.remove(product);
		console.log('Product deleted successfully:', response);
		return response;
	} catch (error) {
		console.error('Error deleting product:', error);
		throw error;
	}
};

export const getAllProducts = async () => {
	try {
		const response = await db.allDocs<Product>({
			include_docs: true,
			startkey: 'product_',
			endkey: 'product_\uffff',
		});
		console.log('Products retrieved successfully:', response);
		return response;
	} catch (error) {
		console.error('Error retrieving products:', error);
		throw error;
	}
};
