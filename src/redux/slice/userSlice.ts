import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { IStudentInfo } from "../../api/userApi";

const initialState: IStudentInfo = {
  loading: false,
  loaded: false,
  email: "",
  fullName: "",
  phoneNumber: "",
  registrationNumber: "",
  lectures: [],
};

export const userSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentInfo: (state, action: PayloadAction<IStudentInfo>) => {
      state.loading = false;
      state.loaded = true;
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.phoneNumber = action.payload.phoneNumber;
      state.registrationNumber = action.payload.registrationNumber;
      state.lectures = action.payload.lectures;
    },
    addLecture: (
      state,
      action: PayloadAction<{
        courseCode: string;
        courseName: string;
        createdAt: string;
      }>
    ) => {
      state.lectures.push(action.payload);
    },
  },
});

export const { setStudentInfo, addLecture } = userSlice.actions;

export const selectStudent = (state: RootState) => state.student;

export default userSlice.reducer;
