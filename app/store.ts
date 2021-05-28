/* eslint-disable import/no-cycle */
import { configureStore } from "@reduxjs/toolkit"

import filtersReducer from "../components/programFilter/filterSlice"

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
