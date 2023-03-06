import { STORAGE_KEY_JWT_TOKEN } from "@env";
import api from ".";
import { storeItemToStorage } from "../util/StorageUtil";

export const signUpUserAPI = async (user: {
  fullName: string;
  registrationNumber: string;
  phoneNumber: string;
  email: string;
  pin: string;
}) => {
  const response = await api.post("/api/auth/signup", user);
  const token = response.headers["authorization"].split(" ")[1];
  await storeItemToStorage(STORAGE_KEY_JWT_TOKEN, token);
  return response.data;
};

export const loginUserAPI = async (user: {
  registrationNumber: string;
  pin: string;
}) => {
  const response = await api.post("/api/auth/login", user);
  console.log(response.headers);
  const token = response.headers["authorization"].split(" ")[1];
  await storeItemToStorage(STORAGE_KEY_JWT_TOKEN, token);
  return response.data;
};
