import pizzaAsparagi from '../img/pizza_asparagi.jpg';
import pizzaDiavola from '../img/pizza_diavola.jpg';
import pizzaQuatroFormaggi from '../img/pizza_4_formaggi.jpg';
import pizzaAlFunghi from '../img/pizza_al_funghi.jpg';
import pizzaMargherita from '../img/pizza_margherita.jpg';
import pizzaMarinara from '../img/pizza_marinara.jpg';
import pizzaFunghiPorcini from '../img/pizza_funghi_porcini.jpg';
import pizzaAlProsciutto from '../img/pizza_al_prosciutto.jpg';
import pizzaPugliese from '../img/pizza_pugliese.jpg';
import pizzaAllaRomana from '../img/pizza_alla_romana.jpg';
import pizzaRustica from '../img/pizza_rustica.jpg';
import pizzaSiciliana from '../img/pizza_siciliana.jpg';

const pizzas = [
    {
        _id: '67rdca3eeb7f6fgeed471815',
        name: 'Pizza Asparagi',
        ingredients: ['pomodoro, mozzarella, asparagi'],
        price: 5.5,
        vote: 3,
        type: ['vegetarian'],
        img: pizzaAsparagi

    },
    {
        _id: '67rdca3eeb7f6fgeed471816',
        name: 'Pizza Diavola',
        ingredients: ['pomodoro, mozzarella, salamino piccante'],
        price: 6,
        vote: 4,
        type: 'red',
        img: pizzaDiavola

    },
    {
        _id: '67rdca3eeb7f6fgeed471817',
        name: 'Pizza 4 Formaggi',
        ingredients: ['pomodoro, mozzarella, formaggio latteria, emmenthal, gorgonzola,'],
        price: 7,
        vote: 5,
        type: 'white',
        img: pizzaQuatroFormaggi
    },
    {
        _id: '67rdca3eeb7f6fgeed471818',
        name: 'Pizza ai Funghi',
        ingredients: ['pomodoro, mozzarella, funghi freschi'],
        price: 5.5,
        vote: 5,
        type: ['vegetarian'],
        img: pizzaAlFunghi
    },
    {
        _id: '67rdca3eeb7f6fgeed471819',
        name: 'Pizza Margherita',
        ingredients: ['pomodoro, mozzarella'],
        price: 5,
        vote: 4,
        type: 'vegetarian',
        img: pizzaMargherita
    },
    {
        _id: '67rdca3eeb7f6fgeed471820',
        name: 'Pizza Marinara',
        ingredients: ['pomodoro, origano, aglio'],
        price: 5.5,
        vote: 3,
        type: 'red',
        img: pizzaMarinara
    },
    {
        _id: '67rdca3eeb7f6fgeed471821',
        name: 'Pizza ai Porcini',
        ingredients: ['pomodoro, mozzarella, porcini trifolati'],
        price: 6,
        vote: 5,
        type: 'vegetarian',
        img: pizzaFunghiPorcini
    },
    {
        _id: '67rdca3eeb7f6fgeed471822',
        name: 'Pizza Prosciutto e Funghi',
        ingredients: ['pomodoro, mozzarella, prosciutto cotto, funghi freschi'],
        price: 7,
        vote: 4,
        type: 'white',
        img: pizzaAlProsciutto
    },
    {
        _id: '67rdca3eeb7f6fgeed471823',
        name: 'Pizza Pugliese',
        ingredients: ['pomodoro, mozzarella, cipolla'],
        price: 5,
        vote: 3,
        type: 'red',
        img: pizzaPugliese
    },
    {
        _id: '67rdca3eeb7f6fgeed471824',
        name: 'Pizza alla Romana',
        ingredients: ['pomodoro, mozzarella, acciughe'],
        price: 6,
        vote: 2,
        type: 'vegetarian',
        img: pizzaAllaRomana
    },
    {
        _id: '67rdca3eeb7f6fgeed47181f',
        name: 'Pizza Rustica',
        ingredients: [' pomodoro, mozzarella, pancetta nostrana, grana in polvere'],
        price: 7,
        vote: 2,
        type: 'white',
        img: pizzaRustica
    },
    {
        _id: '67rdca3eeb7f6fgeed47181r',
        name: 'Pizza Siciliana',
        ingredients: ['pomodoro, mozzarella, olive verdi, acciughe, capperi'],
        price: 7,
        vote: 3,
        type: 'red',
        img: pizzaSiciliana
    }
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(pizzas);
        }, 0);
    });

export default {
    fetchAll
};
