<script setup>

import PageTitleComponent from "@/components/Titles/PageTitleComponent.vue";

</script>

<template>
  <div class="container main-layout">
    <PageTitleComponent>
      <slot name="PageTitle" />
    </PageTitleComponent>
		<main>
			<slot />
		</main>
  </div>
</template>

<style lang="sass" scoped>
.main-layout
	padding-top: 32px
	padding-bottom: 128px

	@media only screen and (min-width: 737px)
		padding-top: 64px
		padding-bottom: 156px

</style>
