<template>
	<header class="page-header">
		<h1 class="page-header__title">
			<slot/>
		</h1>
		<hr class="page-header__underline">
	</header>
</template>

<style scoped lang="sass">
.page-header
	margin-bottom: 64px

	&__title
		font-size: 26px
		line-height: 28px
		margin-bottom: 16px
		color: $dark1

	&__underline
		border-color: rgba(#000, .08)


</style>
