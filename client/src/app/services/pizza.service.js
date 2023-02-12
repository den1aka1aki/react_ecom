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
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            pizzaEndPoint + payload._id,
            payload
        );
        return data;
    },
    createPizza: async (payload) => {
        const { data } = await httpService.post(pizzaEndPoint, payload);
        return data;
    }

};
export default pizzaService;
