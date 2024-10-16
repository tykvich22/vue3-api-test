<script setup lang="ts">
import { defineProps } from 'vue';
import { Product } from '../store/items';
import { useItemsStore } from '../store/items';

const props = defineProps<{ product: Product }>();

const store = useItemsStore();
const { addToCart, removeFromCart, isInCart } = store;
</script>

<template>
	<a-card hoverable class="productCardStyle">
		<template #cover>
			<img alt="product" :src="props.product.image" />
		</template>

		<a-card-meta :title="props.product.title">
			<template #description>Цена: {{ props.product.cost }} ₽</template>
		</a-card-meta>
		<a-button
			class="buttonStyle"
			:type="isInCart(props.product.id) ? 'default' : 'primary'"
			@click="
				isInCart(product.id)
					? removeFromCart(product.id)
					: addToCart(product.id)
			"
			>{{ isInCart(product.id) ? 'В корзине' : 'Добавить в корзину' }}</a-button
		>
	</a-card>
</template>

<style scoped>
.productCardStyle {
	img {
		padding: 2px;
	}
}

.buttonStyle {
	margin-top: 8px;

	width: 166px;
}
</style>
