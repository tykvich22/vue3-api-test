<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useItemsStore } from '../store/items';
import AddToCartButton from './AddToCartButton.vue';

import { computed, defineProps } from 'vue';

const props = defineProps<{ id: string }>();
const store = useItemsStore();

const getCartItem = (id: string) =>
	computed(() => {
		return store.products.find((item) => item.id === id);
	});

const item = getCartItem(props.id);
</script>

<template>
	<div v-if="item" class="container">
		<div class="buttonBackStyle">
			<RouterLink to="/" custom v-slot="{ navigate }">
				<button @click="navigate">в каталог</button></RouterLink
			>
		</div>
		<div class="productCardStyle">
			<div class="imgStyle">
				<img :src="item?.image" alt="мороженое" />
			</div>
			<div class="bodyStyle">
				<div class="descriptionStyle">
					<div class="titleStyle">
						<h2>
							{{ item?.title }}
						</h2>
					</div>
					<div class="costStyle">
						<p>{{ item?.cost }} ₽</p>
					</div>
				</div>
				<AddToCartButton :size="150" :id="props.id" />
			</div>
		</div>
	</div>
	<div v-else class="containerError">
		<h1>Товар не найден</h1>

		<RouterLink to="/">На главную</RouterLink>
	</div>
</template>

<style scoped>
.container {
	min-height: 65vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.buttonBackStyle button {
	margin-left: 30px;
	margin-top: 20px;
	padding: 3px 5px;
	margin-bottom: 15px;
	text-transform: uppercase;
	width: 100px;
	font-weight: 600;
}

.productCardStyle {
	margin: 0 30px;
	display: flex;
	border: 1px solid #ededed;
	border-radius: 8px;
	max-width: 900px;
	justify-content: flex-start;
}

.bodyStyle {
	margin: 30px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.descriptionStyle {
	border-bottom: 2px solid #dfdfdf;
}

.imgStyle {
	img {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}
}

.titleStyle {
	font-size: 1.5rem;
	line-height: 40px;
	color: #7dbcea;
}

.costStyle {
	font-size: 2.5rem;
	color: #515151;
}

@media (max-width: 575px) {
	.productCardStyle {
		flex-direction: column;
		max-width: 70vh;
	}

	.imgStyle {
		img {
			max-width: 100%;
			border-top-right-radius: 8px;
		}
	}

	.titleStyle {
		font-size: 1rem;
	}

	.costStyle {
		font-size: 2rem;
	}
}

.containerError {
	text-align: center;
}

.not-found {
	text-align: center;
	margin-top: 50px;
}

.not-found h1 {
	font-size: 2rem;
	color: #333;
}
</style>
