import baseApi from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: ({ page, limit }) => ({
        url: `/blogs?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
    }),
    getSingleBlogById: builder.query({
      query: (id) => ({
        url: `/blogs/by-id/${id}`,
        method: "GET",
      }),
    }),
    createBlog: builder.mutation({
      query: (formData) => ({
        url: `/blogs`,
        method: "POST",
        body: formData,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({id, formData}) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: formData,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetSingleBlogByIdQuery
} = blogApi;
