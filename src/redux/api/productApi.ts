import baseApi from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page) => ({
        url: `/products?page=${page}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
