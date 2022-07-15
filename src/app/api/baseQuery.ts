import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import axios from "axios";

export const baseQuery = fetchBaseQuery({
  baseUrl: window._HOSTNAME_,
  prepareHeaders: (headers) => {
    headers.set("content-type", "application/json");
    headers.set("authorization", `Bearer ${window._ACCESS_TOKEN_}`);
    return headers;
  },
});

export const axiosInst = axios.create({
  baseURL: window._HOSTNAME_,
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${window._ACCESS_TOKEN_}`,
  },
});