import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  tagTypes: ["Posts"],

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  endpoints: (builder) => ({
    // GET /posts
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),

    // GET /comments
    getComments: builder.query({
      query: () => "/comments",
    }),

    // GET /users
    getUsers: builder.query({
      query: () => "/users",
    }),

    // POST /posts
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),

    // DELETE /posts/:id
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetCommentsQuery,
  useGetUsersQuery,
  useAddPostMutation,
  useDeletePostMutation,
} = api;
