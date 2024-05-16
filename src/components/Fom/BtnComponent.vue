<script setup>

</script>
<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped lang="sass">
.button
	cursor: pointer
	width: 100%
	font-weight: 700
	color: $light
	text-align: center
	line-height: 24px
	background-color: $green
	padding: 12px 16px
	border: none
	border-radius: 4px
	transition: background-color linear .3s

	&:hover
		background-color: $dark-green

	&:disabled,
	&[disabled]
		background-color: $grey

</style>
