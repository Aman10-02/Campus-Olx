import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from "../features/user/userSlice"
import activeReducer from "../features/currentChat/activeSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    currentChat: activeReducer,
  },
});
