<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
	id: String,
	checked: Boolean,
});

const emits = defineEmits(['update:checked']);

const isChecked = ref(props.checked);

const handleChange = (event) => {
	isChecked.value = event.target.checked;
	emits('update:checked', isChecked.value);
};
</script>

<template>
	<div class="input-checkbox">
		<input
			:id="id"
			type="checkbox"
			v-model="isChecked"
			@change="handleChange"
		>
		<label :for="id"><slot/></label>
	</div>
</template>

<style scoped lang="sass">
.input-checkbox
	position: relative
	cursor: pointer

	& label
		display: flex
		font-size: 14px
		line-height: 20px
		color: $grey-blue
		cursor: pointer

		&:before
			content: ''
			box-sizing: border-box
			display: block
			width: 20px
			height: 20px
			border: solid 2px $grey-blue
			border-radius: 2px
			margin-right: 16px
			transition: border-color ease-out .5s

		&:after
			content: ''
			position: absolute
			display: block
			width: 20px
			height: 20px
			background-image: url('data:image/svg+xml,<svg viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg"><path fill="transparent" d="M10.7071 0.292893C11.0976 0.683417 11.0976 1.31658 10.7071 1.70711L4 8.41421L0.292893 4.70711C-0.0976311 4.31658 -0.0976311 3.68342 0.292893 3.29289C0.683417 2.90237 1.31658 2.90237 1.70711 3.29289L4 5.58579L9.29289 0.292893C9.68342 -0.0976311 10.3166 -0.0976311 10.7071 0.292893Z"/></svg>')
			background-size: auto 11px
			background-position: center
			background-repeat: no-repeat
			transition: background linear .3s

	& input[type="checkbox"]
		display: none

		&:checked + label:before
			border-color: $light-grey

		&:checked + label:after
			background-image: url('data:image/svg+xml,<svg viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg"><path fill="%235C00CC" d="M10.7071 0.292893C11.0976 0.683417 11.0976 1.31658 10.7071 1.70711L4 8.41421L0.292893 4.70711C-0.0976311 4.31658 -0.0976311 3.68342 0.292893 3.29289C0.683417 2.90237 1.31658 2.90237 1.70711 3.29289L4 5.58579L9.29289 0.292893C9.68342 -0.0976311 10.3166 -0.0976311 10.7071 0.292893Z"/></svg>')


</style>
