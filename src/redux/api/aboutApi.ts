import baseApi from "./baseApi";

const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    mangeAbout: builder.mutation({
      query: (data) => ({
        url: `/about`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["about"],
    }),
    getAbout: builder.query({
      query: () => ({
        url: `/about`,
        method: "GET",
      }),
      providesTags: ["about"],
    }),
  }),
});

export const { useMangeAboutMutation, useGetAboutQuery } = aboutApi;
