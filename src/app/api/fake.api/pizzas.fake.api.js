const users = [
    {
        _id: '67rdca3eeb7f6fgeed471815',
        name: 'PIZZA ASPARAGI',
        ingredients: ['pomodoro', 'mozzarella', 'asparagi'],
        price: 5.5

    },
    {
        _id: '67rdca3eeb7f6fgeed471816',
        name: 'PIZZA DIAVOLA',
        ingredients: ['pomodoro', 'mozzarella', 'salamino piccante'],
        price: 6

    },
    {
        _id: '67rdca3eeb7f6fgeed471817',
        name: 'PIZZA 4 FORMAGGI',
        ingredients: ['pomodoro', 'mozzarella', 'formaggio latteria', 'emmenthal', 'gorgonzola'],
        price: 7
    },
    {
        _id: '67rdca3eeb7f6fgeed471818',
        name: 'PIZZA AI FUNGHI',
        ingredients: ['pomodoro', 'mozzarella', 'funghi freschi'],
        price: 5.5
    },
    {
        _id: '67rdca3eeb7f6fgeed471819',
        name: 'PIZZA MARGHERITA',
        ingredients: ['pomodoro', 'mozzarella'],
        price: 5
    },
    {
        _id: '67rdca3eeb7f6fgeed471820',
        name: 'PIZZA MARINARA',
        ingredients: ['pomodoro', 'origano', 'aglio'],
        price: 5.5
    },
    {
        _id: '67rdca3eeb7f6fgeed471821',
        name: 'PIZZA AI PORCINI',
        ingredients: ['pomodoro', 'mozzarella', 'porcini trifolati'],
        price: 6
    },
    {
        _id: '67rdca3eeb7f6fgeed471822',
        name: 'PIZZA PROSCIUTTO E FUNGHI',
        ingredients: ['pomodoro', 'mozzarella', 'prosciutto cotto', 'funghi freschi'],
        price: 7
    },
    {
        _id: '67rdca3eeb7f6fgeed471823',
        name: 'PIZZA PUGLIESE',
        ingredients: ['pomodoro', 'mozzarella', 'cipolla'],
        price: 5
    },
    {
        _id: '67rdca3eeb7f6fgeed471824',
        name: 'PIZZA ALLA ROMANA',
        ingredients: ['pomodoro', 'mozzarella', 'acciughe'],
        price: 6
    },
    {
        _id: '67rdca3eeb7f6fgeed47181f',
        name: 'PIZZA RUSTICA',
        ingredients: ['pomodoro', 'mozzarella', 'pancetta nostrana', 'grana in polvere'],
        price: 7
    },
    {
        _id: '67rdca3eeb7f6fgeed47181r',
        name: 'PIZZA SICILIANA',
        ingredients: ['pomodoro', 'mozzarella', 'olive verdi', 'acciughe, capperi'],
        price: 7
    }
];

const fetchAll = () =>
    new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(users);
        }, 2000);
    });

export default {
    fetchAll
};
