<script setup>
import { ref } from 'vue';
import axios from '@/mockServer.js';
import MainLayout from "@/layouts/MainLayout.vue";
import AttentionComponent from "@/components/AttentionComponent.vue";
import SectionTitle from "@/components/Titles/SectionTitle.vue";
import SectionDescription from "@/components/SectionDescription.vue";
import OutlineLink from "@/components/Links/OutlineLink.vue";
import UnderlineLink from "@/components/Links/UnderlineLink.vue";
import IconBoxArrow from "@/components/Icons/IconBoxArrow.vue";
import CatImage from "@/assets/images/cat.svg"
import Cross from "@/components/Icons/Cross.vue";
import InputCheckbox from "@/components/Fom/inputCheckbox.vue";
import BtnComponent from "@/components/Fom/BtnComponent.vue";
import LabelComponent from "@/components/Fom/LabelComponent.vue";
import ErrorMessage from "@/components/Fom/ErrorMessage.vue";
import InputComponent from "@/components/Fom/InputTextComponent.vue";

const pageTitle = 'Смена пароля';

const attentionBlock = {
	title: 'Используйте сложные пароли и не сохраняйте их в браузере.',
	description: 'Данные меры цифровой безопасности помогают предотвратить взлом профиля.'
};

const popup = ref({
	isOpen: false,
	message: '',
});

const togglePopup = () => {
	popup.value.isOpen = !popup.value.isOpen;
};

const checkboxPage = ref(false);

const passInputs = ref([
	{
		id: "pass1",
		label: "Новый пароль",
		placeholder: "Введите новый пароль",
		value: "",
		errorMessage: "",
		isError: false,
	},
	{
		id: "pass2",
		label: "Повторите новый пароль",
		placeholder: "Повторите новый пароль",
		value: "",
		errorMessage: "",
		isError: false
	}
]);

const buttonDisable = ref(false)

const checkForCyrillic = (event, input) => {
	//console.log("Ввод производится: " + event.target.value)
	input.value = event.target.value;
	if (/[\u0400-\u04FF]/.test(event.target.value)) {
		input.isError = true;
		input.error = "Нельзя использовать кириллические символы";
	} else {
		input.isError = false;
		input.error = "";
	}
};

const submitForm = () => {
	let hasError = false;

	passInputs.value.forEach(input => {
		if (!input.value) {
			input.error = "Поле не может быть пустым";
			input.isError = true;
			hasError = true;
		} else if (input.value.length < 8) {
			input.error = "Минимальная длина пароля - 8 символов";
			input.isError = true;
			hasError = true;
		} else if (input.id === "pass2" && input.value !== passInputs.value[0].value) {
			passInputs.value[0].error = "Пароли должны совпадать";
			passInputs.value[0].isError = true;
			input.error = "Пароли должны совпадать";
			input.isError = true;
			hasError = true;
		} else if (/[\u0400-\u04FF]/.test(input.value)) {
			input.error = "Нельзя использовать кириллические символы";
			input.isError = true;
			hasError = true;
		} else {
			input.error = "";
			input.isError = false;
			hasError = false;
		}
	});

	if (!hasError) {
		buttonDisable.value = true;
		axios.post('/api/form', {password: passInputs.value[0].value})
			.then(response => {
				console.log(response.data);
				buttonDisable.value = false;
				togglePopup();
				popup.value.message = response.data.message
			})
			.catch(error => {
				// Обрабатываем ошибку
				console.error(error.response.data.message);
				buttonDisable.value = false;
				togglePopup();
				popup.value.message = error.response.data.message
			});
	}

	if (checkboxPage.value) {
		console.log('Checkbox выбран');
	} else {
		console.log('Checkbox не выбран');
	}
};
</script>

<template>
  <MainLayout>
		<template #PageTitle>
			{{ pageTitle }}
		</template>

		<div class="home">
			<section class="change-password">
				<div class="change-password__attention">
					<AttentionComponent>
						<template #title>
							{{ attentionBlock.title }}
						</template>
						{{ attentionBlock.description }}
					</AttentionComponent>
				</div>
				<div>
					<form class="form-page" @submit.prevent="submitForm">
						<div class="form-page__group"
								 v-for="input in passInputs"
								 :key="input"
						>
							<LabelComponent :for="input.id">
								{{ input.label }}
							</LabelComponent>
							<div class="form-page__input-group">
								<InputComponent
									:id="input.id"
									type="password"
									:placeholder="input.placeholder"
									v-model="input.value"
									:isError="input.isError"
									minlength="8"
									@input="($event) => checkForCyrillic($event, input)"
								/>
								<Cross
									class="form-page__input-group__cross"
									:class="{ 'error' : input.isError}"
								/>
							</div>
							<ErrorMessage :isError="input.isError">
								<span></span>
								{{ input.error }}
							</ErrorMessage>
						</div>
						<InputCheckbox
							:id="'checkboxPage'"
							:checked="checkboxPage"
							@update:checked="value => checkboxPage = value"
						>
							Завершить сеансы на других устройствах
						</InputCheckbox>

						<BtnComponent :disabled="buttonDisable" type="submit">
							Сменить пароль
						</BtnComponent>
					</form>
				</div>
			</section>

			<section class="website-management">
				<SectionTitle>
					Пароли для FTP и SSH
				</SectionTitle>
				<SectionDescription>
					<p>
						По умолчанию для авторизации используется пароль от профиля.
					</p>
					<p>
						Сменить пароль, узнать сервер и IP адрес можно в разделе «Управление сайтами».
					</p>
				</SectionDescription>
				<div class="website-management__btn-group">
					<OutlineLink href="#0" target="_blank">
						Управление сайтами
						<IconBoxArrow />
					</OutlineLink>
					<UnderlineLink href="#0">
						Как настроить?
					</UnderlineLink>
				</div>
			</section>
			<section class="developer-access">
				<img
					class="developer-access__image"
					:src="CatImage"
					alt="A developer's cat with huge coffee balls"
				>
				<div class="developer-access__content">
					<div class="developer-access__text">
						<SectionTitle>
							Доступ для разработчиков
						</SectionTitle>
						<SectionDescription>
							<p>
								Безопасная передача прав для управления и настройки сайтов, с помощью функции делегирования доступа.
							</p>
						</SectionDescription>
					</div>
					<div class="developer-access__links">
						<OutlineLink href="#0">
							Связанные аккаунты
						</OutlineLink>
					</div>
				</div>
			</section>
		</div>
		<div v-if="popup.isOpen" class="popup" @click="togglePopup">
			<div class="popup__close" @click.stop="togglePopup">
				<Cross />
			</div>
			<div class="popup__frame" @click.stop>
				<header class="popup__frame__header">
					<div class="popup__frame__back" @click="togglePopup">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M20 11.9867C20 12.5389 19.5523 12.9867 19 12.9867L7.41137 12.9867L9.71436 15.2935C10.1046 15.6843 10.104 16.3175 9.71318 16.7077C9.32233 17.0979 8.68917 17.0974 8.29897 16.7065L4.29229 12.6932C4.10471 12.5053 3.99954 12.2505 3.99998 11.985C4.00043 11.7195 4.10644 11.4651 4.29465 11.2778L8.30133 7.29112C8.69283 6.90158 9.32599 6.90316 9.71554 7.29467C10.1051 7.68617 10.1035 8.31933 9.712 8.70887L7.42277 10.9867L19 10.9867C19.5523 10.9867 20 11.4344 20 11.9867Z" fill="#008580"/>
						</svg>
						<span>Назад</span>
					</div>

					<div class="popup__frame__close" @click="togglePopup">
						Закрыть
					</div>
				</header>
				<div class="popup__frame__body">
					<p>
						{{ popup.message }}
					</p>
				</div>
			</div>
		</div>
  </MainLayout>
</template>

<style lang="sass" scoped>
.home
	& > section:nth-child(n+2)
		margin-top: 64px

.change-password
	display: grid
	gap: 24px

	@media only screen and (min-width: 737px)
		grid-template-columns: repeat(2, 1fr)

	&__attention
		@media only screen and (min-width: 737px)
			justify-self: end
			order: 1

.website-management
	display: grid
	gap: 18px

	&__btn-group
		display: grid
		justify-content: start
		gap: 12px

		@media only screen and (min-width: 737px)
			grid-template-columns: repeat(2, auto)
			align-items: center

.developer-access
	display: grid
	gap: 24px

	@media only screen and (min-width: 737px)
		grid-template-columns: repeat(2, 1fr)

	&__image
		@media only screen and (min-width: 737px)
			order: 1

	&__content
		display: grid
		gap: 24px

	&__text
		display: grid
		gap: 16px


.popup
	position: fixed
	top: 0
	left: 0
	width: 100%
	height: 100%
	background-color: rgba($dark1, .45)
	z-index: 1100

	@media only screen and (min-width: 737px)
		display: flex
		align-items: center
		justify-content: center

	&__close
		position: absolute
		display: none
		top: 32px
		right: 32px
		box-sizing: border-box
		width: 32px
		height: 32px
		cursor: pointer
		padding: 4px

		@media only screen and (min-width: 737px)
			display: block

		& svg
			fill: $light

	&__frame
		box-sizing: border-box
		width: 100%
		height: 100%
		background-color: $light
		padding: 32px

		@media only screen and (min-width: 737px)
			max-width: 392px
			height: auto
			border-radius: 8px

		&__header
			display: flex
			align-items: center
			margin-bottom: 24px

		&__back
			display: flex
			align-items: center
			color: $dark-green
			font-weight: 700
			font-size: 14px
			line-height: 24px
			cursor: pointer

			@media only screen and (min-width: 737px)
				display: none

		&__close
			display: none
			font-weight: 700
			font-size: 10px
			line-height: 20px
			cursor: pointer
			color: $grey
			text-decoration: underline 2px dashed $dark-green
			text-underline-offset: 4px
			transition: ease-in .3s
			transition-property: color, text-decoration-color
			padding-bottom: 4px
			margin-left: auto

			&:hover
				color: $green
				text-decoration-color: $green

			@media only screen and (min-width: 737px)
				display: block

		&__body
			display: flex
			align-items: center
			height: calc(100% - 56px)
			text-align: center
			font-size: 22px
			line-height: 24px
			font-weight: 700

			& > p
				width: 100%

.form-page
	width: 100%
	max-width: 328px

	& > *:nth-child(n+2)
		margin-top: 32px

	&__group
		margin-bottom: 8px

		&:last-child
			margin-bottom: 0

	&__input-group
		position: relative

		&__cross
			position: absolute
			width: 16px
			height: 16px
			top: calc(50% - 8px)
			right: 16px
			fill: transparent
			transition: fill ease-out .3s

			&.error
				fill: red

</style>
