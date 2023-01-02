import httpService from './http.service';

const pizzaEndPoint = 'pizza/';
const pizzaService = {
    get: async () => {
        const { data } = await httpService.get(pizzaEndPoint);
        console.log(data);
        return data;
    }
};
export default pizzaService;
