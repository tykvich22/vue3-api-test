<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
	<div class="not-found">
		<h1>404 - Страница не найдена</h1>
		<p>Извините, но страница, которую вы ищете, не существует.</p>
		<RouterLink to="/">На главную</RouterLink>
	</div>
</template>

<style scoped>
.not-found {
	text-align: center;
	margin-top: 50px;
}

.not-found h1 {
	font-size: 2rem;
	color: #333;
}

.not-found p {
	margin: 20px 0;
	color: #666;
}
</style>
