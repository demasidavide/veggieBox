
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    // qui aggiungerai i tuoi reducers in un secondo momento
  },
  devTools: process.env.NODE_ENV !== 'production',
});