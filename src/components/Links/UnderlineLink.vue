<script setup>

</script>

<template>
	<a class="underline-link" href="">
		<slot />
	</a>
</template>

<style scoped lang="sass">
.underline-link
	display: inline-block
	font-weight: 700
	line-height: 20px
	color: $dark-green
	text-decoration: underline 2px dashed $dark-green
	text-underline-offset: 6px
	transition: ease-in .3s
	transition-property: color, text-decoration-color
	padding-bottom: 4px

	&:hover
		color: $green
		text-decoration-color: $green
</style>
