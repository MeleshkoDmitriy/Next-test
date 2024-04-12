import { configureStore } from "@reduxjs/toolkit";
import userSlice, { submitOrder } from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(submitOrder)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
