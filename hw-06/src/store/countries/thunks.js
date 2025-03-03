import { createAsyncThunk } from "@reduxjs/toolkit";
import services from './../../services/countries';
import { sliceName } from "./constants";

const thunks = {
  fetchCountries: createAsyncThunk(`${sliceName}/fetchCountries`, async () => {
    const response = await services.get();
    return response;
  }),
  fetchCountry: createAsyncThunk(`${sliceName}/fetchCountry`, async (id) => {
    const response = await services.get(id);
    return response;
  }), 
  fetchDeleteCountry: createAsyncThunk(`${sliceName}/fetchDeleteCountry`, async (id) => {
    await services.delete(id);
    return id;
  }),
};

export default thunks;