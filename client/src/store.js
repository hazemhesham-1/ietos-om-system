import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import authSlice from "./features/auth/authSlice";
import equipmentSlice from "./features/equipment/equipmentSlice";
import siteVisitSlice from "./features/visits/siteVisitSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        equipment: equipmentSlice,
        siteVisit: siteVisitSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    }
});