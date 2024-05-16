<script setup>
import { defineProps } from 'vue';

const props = defineProps({
	isError: Boolean,
})
</script>

<template>
	<input
		class="input-text"
		:class="{ 'error': isError }"
	>
</template>

<style scoped lang="sass">
.input-text
	display: block
	box-sizing: border-box
	width: 100%
	color: $dark2
	line-height: 2
	border-width: 0 0 1px 0
	border-color: rgba(#000, .16)
	padding: 0 48px 0 8px

	&:focus
		outline: none

	&::placeholder
		color: $grey

	&.error
		color: red
		border-color: red
</style>
