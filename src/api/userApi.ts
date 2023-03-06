import { STORAGE_KEY_JWT_TOKEN } from "@env";

import api from ".";
import { getItemFromStorage } from "../util/StorageUtil";

export interface IStudentInfo {
  email: string;
  fullName: string;
  phoneNumber: string;
  registrationNumber: string;
  lectures: { courseCode: string; courseName: string; createdAt: string }[];
}

export const getStudentInfoAPI = async () => {
  const jwt = await getItemFromStorage(STORAGE_KEY_JWT_TOKEN);
  const response = await api.get<IStudentInfo>("/api/students/student-info", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data;
};

export const checkInStudentAPI = async (data: { lectureId: string }) => {
  const jwt = await getItemFromStorage(STORAGE_KEY_JWT_TOKEN);
  const response = await api.post("/api/students/check-in", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data;
};

export const verifyPin = async (data: { pin: string }) => {
  const jwt = await getItemFromStorage(STORAGE_KEY_JWT_TOKEN);
  const response = await api.post("/api/students/verify-pin", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data;
};
