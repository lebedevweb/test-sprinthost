<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	isError: Boolean,
})
</script>

<template>
	<div
		class="error-message"
		:class="{ 'error' : isError}"
	>
		<span>*</span>
		<slot />
	</div>
</template>

<style scoped lang="sass">
.error-message
	color: transparent
	font-size: 12px
	line-height: 16px
	margin-top: 4px

	& span
		font-weight: 700

	&.error
		color: red
</style>
