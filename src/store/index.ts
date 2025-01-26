import { configureStore } from '@reduxjs/toolkit';
import { uiReducer, uiStoreName } from './ui';
import { adminReducer, adminStoreName } from './admin';

export const reducers = {
  [uiStoreName]: uiReducer,
  [adminStoreName]: adminReducer,
};
export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
