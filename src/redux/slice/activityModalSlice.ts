import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface ModalState {
  isModalOpen: boolean;
}

const initialState: ModalState = {
  isModalOpen: false,
};

export const activityModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleActivityModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { toggleActivityModal } = activityModalSlice.actions;

export const selectActivityModal = (state: RootState) =>
  state.activityMoadl.isModalOpen;

export default activityModalSlice.reducer;
