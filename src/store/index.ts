import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import customersSlice from './slices/customersSlice';
import mattersSlice from './slices/mattersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    customers: customersSlice,
    matters: mattersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;