<script setup lang="ts">
import { ref, computed, defineProps, watch } from 'vue';
import { useItemsStore } from '../store/items';

const props = defineProps<{ size: number; id: string }>();

const buttonWidth = computed(() => `${props.size}px`);
const WidthHeight = computed(() => `${Math.round(props.size) / 3}px`);
const changeCountWidth = computed(() => `${Math.round(props.size) + 30}px`);

const value = ref<number | undefined>(1);

const store = useItemsStore();
const { updateItemCount, addToCart, removeFromCart } = store;

const getCartItem = (id: string) =>
	computed(() => {
		return store.cart.find((item) => item.id === id);
	});

let item = getCartItem(props.id);

if (item) {
	value.value = item.value?.count;
}

const validateAndUpdate = (newCount: number) => {
	const validatedCount = Math.max(1, Math.min(newCount, 99));

	value.value = validatedCount;
	updateItemCount(props.id, validatedCount);
};

watch(value, (newVal) => {
	if (newVal) {
		validateAndUpdate(newVal);
	}
});

const decrementCount = () => {
	if (value.value) {
		if (value.value - 1 < 1) {
			removeFromCart(props.id);
			return;
		}
		validateAndUpdate(value.value - 1);
	}
};

const incrementCount = () => {
	if (value.value) {
		validateAndUpdate(value.value + 1);
	}
};

const handleAddToCart = () => {
	addToCart(props.id);
	value.value = 1;
};
</script>

<template>
	<div
		v-if="item"
		:style="{ width: changeCountWidth }"
		class="changeCountStyle"
	>
		<div class="buttonCountStyle">
			<button
				:style="{ width: WidthHeight, height: WidthHeight }"
				@click="decrementCount"
			>
				-
			</button>
		</div>
		<input
			:style="{ width: WidthHeight }"
			class="inputStyle"
			type="number"
			min="1"
			max="99"
			v-model="value"
			@input="value !== undefined && validateAndUpdate(value)"
		/>
		<div class="buttonCountStyle">
			<button
				:style="{ width: WidthHeight, height: WidthHeight }"
				@click="incrementCount"
			>
				+
			</button>
		</div>
	</div>
	<div v-else class="buttonStyle">
		<button
			@click="handleAddToCart"
			:style="{ width: buttonWidth, height: WidthHeight }"
		>
			в корзину
		</button>
	</div>
</template>

<style scoped>
.changeCountStyle {
	display: flex;
	justify-content: space-between;
	margin-top: 15px;
}

.inputStyle {
	text-align: center;
	color: #333;
	border: 1px solid #d9d9d9;
	border-radius: 6px;
}

.inputStyle:focus {
	border-color: #6599be;
}

.buttonStyle button {
	text-transform: uppercase;
	font-size: 0.8rem;
	font-weight: 600;
	background-color: #7dbcea;
	border-color: #7dbcea;
	color: #ffffff;
	margin-top: 15px;
}

.buttonStyle button:hover {
	border: 1px solid #6599be;
}

.buttonCountStyle button {
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 600;
}
</style>
