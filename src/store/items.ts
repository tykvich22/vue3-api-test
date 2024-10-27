import { defineStore } from 'pinia';
import { fetchProducts } from '../api/api';
import { computed, ref } from 'vue';

export interface Product {
	id: string;
	title: string;
	image: string;
	cost: number;
}

export interface CartItem extends Product {
	count: number;
}

export const useItemsStore = defineStore('items', () => {
	const products = ref<Product[]>([]);
	const cart = ref<CartItem[]>([]);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	const loadCartFromLocalStorage = () => {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			cart.value = JSON.parse(savedCart);
		}
	};
	const saveCartToLocalStorage = (): void => {
		localStorage.setItem('cart', JSON.stringify(cart.value));
	};

	const loadProducts = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			const data = await fetchProducts();
			if (data) {
				products.value = data;
			}
			loadCartFromLocalStorage();
		} catch (err) {
			error.value = 'Ошибка загрузки товаров. Перезагрузите страницу! ';
		} finally {
			isLoading.value = false;
		}
	};

	loadProducts();

	const addToCart = (id: string) => {
		const item = products.value.find((item) => item.id === id);

		if (item) {
			cart.value.push({ ...item, count: 1 });
		}
		saveCartToLocalStorage();
	};

	const removeFromCart = (id: string) => {
		cart.value = cart.value.filter((item) => item.id !== id);
		saveCartToLocalStorage();
	};

	const updateItemCount = (id: string, count: number) => {
		const item = findItemInCart(id);
		if (item) {
			item.count = count;
			saveCartToLocalStorage();
		}
	};

	const findItemInCart = (id: string) => {
		return cart.value.find((item) => item.id === id) || null;
	};

	const totalItems = computed(() => {
		return cart.value.reduce((total, item) => total + item.count, 0);
	});

	const totalCost = computed(() => {
		return cart.value.reduce(
			(total, item) => total + item.cost * item.count,
			0
		);
	});
	return {
		products,
		cart,
		isLoading,
		error,
		addToCart,
		removeFromCart,
		findItemInCart,
		totalItems,
		totalCost,

		updateItemCount,
	};
});
