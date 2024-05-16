import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create();

const mock = new MockAdapter(axiosInstance, { delayResponse: 3000 }); // Задержка ответа в 3 секунды

let successResponse = true;

mock.onPost('/api/form').reply(config => {
	return new Promise(resolve => {
		setTimeout(() => {
			if (successResponse) {
				resolve([200, { success: true, message: 'Форма успешно отправлена!' }]);
			} else {
				resolve([500, { success: false, message: 'Ошибка при отправке формы!' }]);
			}
			successResponse = !successResponse; // Чередование успешного и неуспешного ответов
		});
	});
});

export default axiosInstance;
