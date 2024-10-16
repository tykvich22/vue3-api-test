import { Product } from '../store/items';

export const fetchProducts = async (): Promise<Product[] | undefined> => {
	try {
		const response = await fetch('https://webapi.omoloko.ru/api/v1/products');

		if (!response.ok) {
			throw new Error(`Ошибка: ${response.status}`);
		}

		const fetchdata = await response.json();

		const data: Product[] = fetchdata.products.map((product: any) => ({
			id: product.id,
			title: product.title,
			image: product.image,
			cost: product.cost,
		}));

		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
