import { configureStore } from '@reduxjs/toolkit';

import countries from './countries/slice'

export const store = configureStore({
  reducer: {countries},
})