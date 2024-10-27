<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ProductCard from '../components/ProductCard.vue';
import { FilterOutlined } from '@ant-design/icons-vue';
import { useItemsStore } from '../store/items';
import { computed, nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useItemsStore();
const { products } = storeToRefs(store);

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

const route = useRoute();
const router = useRouter();

const pageSize = 10;
const currentPage = ref(Number(route.query.page) || 1);

const paginatedProducts = computed(() => {
	const start = (currentPage.value - 1) * pageSize;
	const end = start + pageSize;
	return filteredProducts.value.slice(start, end);
});
const totalProducts = computed(() => filteredProducts.value.length);

watch(currentPage, (newPage) => {
	router.push({ query: { page: newPage.toString() } });
});
</script>

<template>
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
	/>
</template>

<style scoped>
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
