<script setup>

import IconAttention from "@/components/Icons/IconAttention.vue";
</script>

<template>
	<aside class="attention">
		<div class="attention__icon">
			<IconAttention />
		</div>
		<h2 class="attention__title">
			<slot name="title" />
		</h2>
		<p class="attention__description">
			<slot />
		</p>
	</aside>
</template>

<style scoped lang="sass">
.attention
	max-width: 240px
	border: solid 1px $yellow1
	border-radius: 8px
	padding: 16px

	&__icon
		box-sizing: border-box
		width: 40px
		height: 40px
		border-radius: 50%
		background-color: $yellow3
		padding: 8px
		margin-bottom: 4px

		& > svg
			fill: $dark1

	&__title
		font-size: 14px
		line-height: 20px
		margin-bottom: 4px
		color: $dark2

	&__description
		font-size: 12px
		line-height: 16px
		color: $grey-blue
</style>
