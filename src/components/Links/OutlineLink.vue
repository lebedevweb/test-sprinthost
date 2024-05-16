<template>
	<a class="outline-link" href="">
		<slot />
	</a>
</template>

<style scoped lang="sass">
.outline-link
	display: inline-flex
	align-items: center
	text-decoration: none
	line-height: 24px
	font-weight: 700
	border: solid 2px $green
	border-radius: 4px
	color: $dark1
	padding: 8px 16px
	transition: ease-out .3s
	transition-property: background-color, color

	& > *
		margin-left: 12px
		fill: $dark1
		color: $dark1
		transition: fill ease-out .3s


	&:hover
		color: $light
		background-color: $dark-green

		& > *
			fill: $light
			color: $light
</style>
