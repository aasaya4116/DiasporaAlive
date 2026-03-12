import { configureStore } from '@reduxjs/toolkit';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import searchSlice from './searchSlice';
import filterSlice from './filterSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;