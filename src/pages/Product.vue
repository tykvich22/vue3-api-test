<script setup lang="ts">
import ProductCardFull from '../components/ProductCardFull.vue';
import { defineProps } from 'vue';

const props = defineProps(['id']);
</script>

<template>
	<ProductCardFull :id="props.id" />
</template>

<style scoped></style>
