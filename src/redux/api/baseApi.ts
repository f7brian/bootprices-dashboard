import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_LOCAL,
    // baseUrl: "https://b769-182-252-68-225.ngrok-free.app/api",
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("Token is set:", token); 
      } else {
      }
      // hello
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["auth", "about", "products"],
});

export default baseApi;
