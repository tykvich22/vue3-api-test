<script setup lang="ts">
import { storeToRefs } from 'pinia';
import CartIcon from './components/CartIcon.vue';
import { useItemsStore } from './store/items';
import IceCreamLoading from './components/IceCreamLoading.vue';
import { RouterLink, RouterView } from 'vue-router';

const store = useItemsStore();
const { isLoading, error } = storeToRefs(store);
</script>

<template>
	<a-layout>
		<a-layout-header class="headerStyle">
			<a-flex align="center" justify="space-between">
				<RouterLink to="/" custom v-slot="{ navigate }">
					<a-typography-title class="titleStyle" @click="navigate"
						>мороженое</a-typography-title
					>
				</RouterLink>
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
				<RouterView />
			</template>
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
	cursor: pointer;
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

.iceCreamContainerStyle {
	min-height: 80vh;
}

.contentStyle {
	min-height: 80vh;
}

.footerStyle {
	text-align: center;
	color: #fff;
	background-color: #6599be;
	min-height: 10vh;
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

	.iceCreamContainerStyle {
		min-height: 90vh;
	}

	.contentStyle {
		min-height: 90vh;
	}

	.footerStyle {
		min-height: 5vh;
	}
}
</style>
