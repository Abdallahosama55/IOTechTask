"use client"

import { configureStore } from "@reduxjs/toolkit"
import { Services } from "./Services"

export const store = configureStore({
  reducer: {
    [Services.reducerPath]: Services.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Services.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
