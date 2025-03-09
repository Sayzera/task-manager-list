import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import helper_components_api from "./api";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    [helper_components_api.reducerPath]: helper_components_api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(helper_components_api.middleware),
});
