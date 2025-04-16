import { configureStore } from "@reduxjs/toolkit";

import mapReducer from "./mapSlice"

export const store = configureStore({
  reducer: {
    // map: mapReducer,
  },
  // Optional configuration
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* any custom middleware */),
  devTools: process.env.NODE_ENV !== 'production',
  // You can add preloadedState here if needed
  preloadedState: {},
});

export default store
