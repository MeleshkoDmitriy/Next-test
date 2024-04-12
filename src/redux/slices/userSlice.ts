import { TCartProduct } from "@/types/types";
import { ORDER_URL } from "@/utils/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    cart: TCartProduct[],
    phoneNumber: number | null,
    isLoading: boolean,
}

const initialState: IInitialState =  {
    cart: [],
    phoneNumber: null,
    isLoading: false,
}

if(localStorage.getItem('cart')) {
    initialState.cart = JSON.parse(localStorage.getItem('cart'));
}

if(localStorage.getItem('phoneNumber')) {
    initialState.phoneNumber = parseInt(localStorage.getItem('phoneNumber'));
}

export const submitOrder = createAsyncThunk('user/submitOrder', async (_, { getState }) => {
    const url = ORDER_URL;
    const { cart, phoneNumber } = getState().user;

    const data = {
        phone: phoneNumber,
        cart: cart.map(item => ({ id: item.id, quantity: item.quantity })),
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error('Failed to submit order: ' + response.statusText);
        }
    } catch (error) {
        throw error;
    } finally {
        console.log('finally')
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addProductToCart: (state, { payload }) => {
            let newCart = [...state.cart];

            const foundProduct = state.cart.find(({ id }) => id === payload.id);

            if (foundProduct) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id   ? { ...item, quantity: ++item.quantity }
                                                    : item
                })
            } else {
                newCart.push({ ...payload, quantity: 1 })
            }

            state.cart = newCart;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        minusProductFromCart: (state, { payload }) => {
            let newCart = [...state.cart];

            const productObj = state.cart.find((product) => {
                if(product.id === payload.id) {
                    return product;
                }
            });

            if (productObj && productObj.quantity > 1) {            
                newCart = newCart.map((item) => {
                    if (item.id === payload.id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item;
                    }
                })
            } else {
                newCart = newCart.filter((product) => product.id !== payload.id)
            }
            
            state.cart = newCart;     
            localStorage.setItem('cart', JSON.stringify(state.cart));       
        },
        removeProductFromCart: (state, { payload }) => {
            let newCart = [...state.cart];

            const foundProduct = state.cart.find(({ id }) => id === payload.id);

            if (foundProduct) {
                newCart = newCart.filter((product) => product.id !== payload.id)
            } else {
                return;
            }

            state.cart = newCart;
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        changeProductQuantity:(state, { payload }) => {
            const { productId, quantity } = payload;

            const productToUpdate = state.cart.find(product => product.id === productId);
            if (productToUpdate) {
                productToUpdate.quantity = quantity;
        
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        savePhoneNumber: (state, { payload }) => {
            state.phoneNumber = payload;
            localStorage.setItem('phoneNumber', state.phoneNumber.toString());
        },
    },
    extraReducers: (builder) => {
        builder.addCase(submitOrder.fulfilled, (state, action) => {
            console.log('Order submitted successfully:', action.payload);
        });
        builder.addCase(submitOrder.rejected, (state, action) => {
            console.error('Failed to submit order:', action.error.message);
        });
    }
})

export const { 
    addProductToCart, 
    removeProductFromCart,
    minusProductFromCart,
    savePhoneNumber,
    changeProductQuantity,
} = userSlice.actions;

// export const { savePhoneNumber } = userSlice.actions;
export default userSlice.reducer;