<script setup lang="ts">
import { storeToRefs } from 'pinia';
import CartIcon from './components/CartIcon.vue';
import ProductCard from './components/ProductCard.vue';
import { FilterOutlined } from '@ant-design/icons-vue';
import { useItemsStore } from './store/items';
import IceCreamLoading from './components/IceCreamLoading.vue';
import { computed, nextTick, ref, watch } from 'vue';

const store = useItemsStore();
const { products, isLoading, error } = storeToRefs(store);

const inputRef = ref<HTMLInputElement | null>(null);

const filter = ref('');
const filteredProducts = computed(() => {
	return products.value.filter((product) =>
		product.title.toLowerCase().includes(filter.value.toLowerCase())
	);
});
const isInputVisible = ref(false);
const toggleInputVisibility = () => {
	isInputVisible.value = !isInputVisible.value;

	if (isInputVisible.value) {
		nextTick(() => {
			inputRef.value?.focus();
		});
	}
};

watch(filter, () => {
	currentPage.value = 1;
});

const pageSize = 10;
const currentPage = ref(1);
const paginatedProducts = computed(() => {
	const start = (currentPage.value - 1) * pageSize;
	const end = start + pageSize;
	return filteredProducts.value.slice(start, end);
});
const totalProducts = computed(() => filteredProducts.value.length);
</script>

<template>
	<a-layout>
		<a-layout-header class="headerStyle">
			<a-flex align="center" justify="space-between">
				<a-typography-title class="titleStyle">мороженое</a-typography-title>

				<CartIcon
			/></a-flex>
		</a-layout-header>
		<a-layout-content class="contentStyle">
			<template v-if="isLoading"
				><a-flex class="iceCreamContainerStyle" justify="center" align="center">
					<IceCreamLoading
				/></a-flex>
			</template>
			<template v-else-if="error">
				<a-alert :message="error" type="error" show-icon banner />
			</template>
			<template v-else>
				<a-flex vertical>
					<a-button class="filterButtonStyle" @click="toggleInputVisibility">
						<FilterOutlined />
						<a-typography-text>по названию</a-typography-text>
					</a-button>
					<a-input
						ref="inputRef"
						class="filterInputStyle"
						v-if="isInputVisible"
						placeholder="..."
						v-model:value="filter" /></a-flex
				><a-row :gutter="[16, 2]">
					<a-col
						v-for="product in paginatedProducts"
						:key="product.id"
						class="gutter-row"
						:xs="24"
						:sm="12"
						:md="8"
						:lg="6"
					>
						<div class="gutter-box"><ProductCard :product="product" /></div>
					</a-col>
				</a-row>
				<a-pagination
					class="paginationStyle"
					v-model:current="currentPage"
					:pageSize="pageSize"
					:total="totalProducts"
			/></template>
		</a-layout-content>
		<a-layout-footer class="footerStyle">
			<a-typography-link
				href="https://github.com/tykvich22"
				class="linkStyle"
				target="_blank"
			>
				GitHub
			</a-typography-link>
			/
			<a-typography-link
				href="https://t.me/hdhdhdjsfu"
				class="linkStyle"
				target="_blank"
			>
				Telegram
			</a-typography-link></a-layout-footer
		>
	</a-layout>
</template>

<style scoped>
.titleStyle {
	color: #fff;
	font-family: 'Lobster', sans-serif;
	font-weight: 600;
	font-size: 2.5rem;
}

.linkStyle {
	color: #fff;
}

.headerStyle {
	color: #fff;
	background-color: #7dbcea;
	min-height: 10vh;
	padding-inline: 45px;
}

.contentStyle {
	min-height: 80vh;
}

.iceCreamContainerStyle {
	min-height: 80vh;
}

.footerStyle {
	text-align: center;
	color: #fff;
	background-color: #6599be;
	min-height: 10vh;
}

.gutter-box {
	padding: 15px 20px;
	max-width: 300px;
}

.paginationStyle {
	text-align: center;
	margin: 20px;
}

.filterButtonStyle {
	width: 130px;
	margin: 10px 0 0 20px;
	padding: 5px;
}

.filterInputStyle {
	width: 170px;
	margin: 5px 0 0 20px;
}

@media (max-width: 575px) {
	.titleStyle {
		font-size: 1.8rem;
		padding-top: 8px;
	}

	.headerStyle {
		min-height: 5vh;
		padding-inline: 30px;
		min-height: 5vh;
	}

	.contentStyle {
		min-height: 90vh;
	}

	.iceCreamContainerStyle {
		min-height: 90vh;
	}

	.footerStyle {
		min-height: 5vh;
	}

	.gutter-box {
		padding: 15px 35px;
		max-width: 550px;
	}

	.filterButtonStyle {
		margin: 10px 0 0 35px;
	}

	.filterInputStyle {
		margin: 5px 0 0 35px;
	}
}
</style>
