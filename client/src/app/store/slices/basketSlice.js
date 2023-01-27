import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCar (state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
            } else {
                const tempPizza = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempPizza);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        decreaseCart (state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item._id !== action.payload._id
                );

                state.cartItems = nextCartItems;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart (state, action) {
            state.cartItems.map((cartItem) => {
                if (cartItem._id === action.payload._id) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item._id !== cartItem._id
                    );
                    state.cartItems = nextCartItems;
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                return state;
            });
        },
        clearCart (state, action) {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        getTotals (state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
});
const { reducer: cartReducer, actions } = cartSlice;
export const { addToCar, getTotals, decreaseCart, removeFromCart, clearCart } =
  actions;

export default cartReducer;
