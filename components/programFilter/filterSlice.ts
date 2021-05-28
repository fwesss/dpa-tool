/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { filters, FilterName } from "../../program-data"

import type { RootState } from "../../app/store"

interface FilterState {
  filters: {
    [key in FilterName]: boolean
  }
}

const initialState: FilterState = {
  filters: Object.fromEntries(
    Object.keys(filters).map(filter => [filter, true])
  ) as {
    [key in FilterName]: boolean
  },
}

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilters: (
      state,
      action: PayloadAction<{ active: boolean; filter: FilterName }>
    ) => {
      state.filters[action.payload.filter] = action.payload.active
    },
    changeFicoFilters: (state, action: PayloadAction<number>) => {
      switch (action.payload) {
        case 680:
          state.filters["620Fico"] = true
          state.filters["640Fico"] = true
          state.filters["660Fico"] = true
          state.filters["680Fico"] = false
          break
        case 660:
          state.filters["620Fico"] = true
          state.filters["640Fico"] = true
          state.filters["660Fico"] = false
          state.filters["680Fico"] = false
          break
        case 640:
          state.filters["620Fico"] = true
          state.filters["640Fico"] = false
          state.filters["660Fico"] = false
          state.filters["680Fico"] = false
          break
        case 620:
          state.filters["620Fico"] = false
          state.filters["640Fico"] = false
          state.filters["660Fico"] = false
          state.filters["680Fico"] = false
          break
        default:
          state.filters["620Fico"] = true
          state.filters["640Fico"] = true
          state.filters["660Fico"] = true
          state.filters["680Fico"] = true
      }
    },
    changeDtiFilters: (state, action: PayloadAction<number>) => {
      switch (action.payload) {
        case 45:
          state.filters["55Dti"] = true
          state.filters["50Dti"] = true
          state.filters["45Dti"] = false
          break
        case 50:
          state.filters["55Dti"] = true
          state.filters["50Dti"] = false
          state.filters["45Dti"] = false
          break
        case 55:
          state.filters["55Dti"] = false
          state.filters["50Dti"] = false
          state.filters["45Dti"] = false
          break
        default:
          state.filters["55Dti"] = true
          state.filters["50Dti"] = true
          state.filters["45Dti"] = true
      }
    },
  },
})

export const { changeFilters, changeFicoFilters, changeDtiFilters } =
  filterSlice.actions

export const selectFilters = (state: RootState): RootState["filters"] =>
  state.filters

export default filterSlice.reducer
