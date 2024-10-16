<script setup lang="ts">
import { ShoppingCartOutlined } from '@ant-design/icons-vue';
import { storeToRefs } from 'pinia';

import { useItemsStore } from '../store/items';

const store = useItemsStore();
const { totalItems, totalCost } = storeToRefs(store);
</script>

<template>
	<div class="cartStyle">
		<template v-if="totalCost">
			<a-tag :bordered="false" color="volcano">{{ totalCost }} ₽</a-tag>
		</template>
		<a-badge :count="totalItems">
			<a-avatar size="large" shape="square">
				<template #icon><ShoppingCartOutlined /></template>
			</a-avatar>
		</a-badge>
	</div>
</template>

<style scoped></style>
