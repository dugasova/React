import { createSlice } from "@reduxjs/toolkit";
import thunks from "./thunks";
import { sliceName } from "./constants";

const initialState = {
  countries: [],
  selctedCountry: null,
  selectedTranslation: null
}

export const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setCountry(state, { payload }) {
      if (payload) {
        state.selectedCountry = state.countries.find(
          (item) => item.id === payload
        );
      } else {
        if (!state.selectedCountry) {
          state.selectedCountry = state.countries[0];
        }
      }
    },
    setTranslation(state, { payload }) {
      if (payload) {
        state.selectedTranslation = payload;
      } else {
        if (state.selectedCountry) {
          state.selectedTranslation = Object.keys(
            state.selectedCountry.translations
          )[0];
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.fetchCountries.fulfilled, (state, { payload }) => {
        state.countries = payload;
      })
      .addCase(thunks.fetchCountry.fulfilled, (state, { payload }) => {
        state.selectedCountry = payload;
      })
      .addCase(thunks.fetchDeleteCountry.fulfilled, (state, { payload }) => {
        state.countries = state.countries.filter((item) => item.id !== payload);
        state.selectedCountry = null;
        state.selectedTranslation = null;
      });
  },
});

export const { setCountry, setTranslation } = slice.actions;
export default slice.reducer;