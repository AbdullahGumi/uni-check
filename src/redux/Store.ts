import { configureStore } from "@reduxjs/toolkit";
import activityModalSlice from "./slice/activityModalSlice";
import userSlice from "./slice/userSlice";

export const Store = configureStore({
  reducer: {
    student: userSlice,
    activityMoadl: activityModalSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
