import httpService from './http.service';

const pizzaEndPoint = 'pizza/';
const pizzaService = {
    get: async () => {
        const { data } = await httpService.get(pizzaEndPoint);
        return data;
    },
    removePizza: async (pizzaId) => {
        const { data } = await httpService.delete(pizzaEndPoint + pizzaId);
        return data;
    }
};
export default pizzaService;
