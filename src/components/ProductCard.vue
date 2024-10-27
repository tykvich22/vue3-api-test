<script setup lang="ts">
import { defineProps } from 'vue';
import { Product } from '../store/items';
import AddToCartButton from './AddToCartButton.vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{ product: Product }>();
</script>

<template>
	<a-card hoverable class="productCardStyle">
		<template #cover>
			<RouterLink
				:to="{
					name: 'ProductDetail',
					params: {
						id: product.id,
					},
				}"
				custom
				v-slot="{ navigate }"
			>
				<img @click="navigate" alt="product" :src="props.product.image" />
			</RouterLink>
		</template>
		<RouterLink
			:to="{
				name: 'ProductDetail',
				params: {
					id: product.id,
				},
			}"
			custom
			v-slot="{ navigate }"
		>
			<a-card-meta :title="props.product.title" @click="navigate">
				<template #description>Цена: {{ props.product.cost }} ₽</template>
			</a-card-meta>
		</RouterLink>
		<AddToCartButton :size="120" :id="product.id" />
	</a-card>
</template>

<style scoped>
.productCardStyle {
	img {
		padding: 30px;
	}
}
</style>
