import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../Store";
import { IUserState } from "../types";

const initialState: IUserState = {
  loading: false,
  loaded: false,
  phoneNumber: "",
  firstName: "",
  lastName: "",
  accountNumber: "",
  accountBalance: "",
  email: "",
  gender: undefined,
  transactionHistory: {
    loading: false,
    loaded: false,
    data: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        gender: number;
        accountNumber: string;
        accountBalance: string;
      }>
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.gender = action.payload.gender;
      state.accountNumber = action.payload.accountNumber;
      state.accountBalance = action.payload.accountBalance;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
