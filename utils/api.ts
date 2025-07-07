import request from "superagent";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = process.env.BASE_URL || "";

export const api = {
  post: (url: string) => request.post(`${BASE_URL}${url}`),
  put: (url: string) => request.put(`${BASE_URL}${url}`),
  get: (url: string) => request.get(`${BASE_URL}${url}`),
  delete: (url: string) => request.delete(`${BASE_URL}${url}`),
};
