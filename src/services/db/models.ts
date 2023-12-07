export interface Product {
	_id: PouchDB.Core.DocumentId;
	_rev: PouchDB.Core.RevisionId;
	type: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	supplier: Supplier;
	category: string;
	barcode: string;
	createdAt: string;
	updatedAt: string;
}

export interface Supplier {
	type: string;
	name: string;
	contact: string;
}

export interface StockTransaction {
	_id: PouchDB.Core.DocumentId;
	_rev: PouchDB.Core.RevisionId;
	type: string;
	productId: string;
	quantityChange: number;
	timestamp: string;
}

export interface Report {
	_id: PouchDB.Core.DocumentId;
	_rev: PouchDB.Core.RevisionId;
	type: string;
	reportType: string;
	data: any; // Adjust as per your actual report data structure
	timestamp: string;
}

export interface Alert {
	_id: PouchDB.Core.DocumentId;
	_rev: PouchDB.Core.RevisionId;
	type: string;
	productId: string;
	alertType: string;
	timestamp: string;
}
