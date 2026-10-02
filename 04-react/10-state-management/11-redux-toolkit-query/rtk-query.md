# Redux Toolkit Query (RTK Query)

## Overview

RTK Query is a data-fetching and caching feature built into Redux Toolkit.

It reduces the amount of manual code needed for API calls. Instead of creating `createAsyncThunk`, handling `pending/fulfilled/rejected` in `extraReducers`, and manually storing loading/error/data state, RTK Query provides generated hooks that manage these states for us.

### Manual Redux Toolkit API approach

```text
createAsyncThunk
      ↓
API call
      ↓
pending / fulfilled / rejected
      ↓
extraReducers
      ↓
manually manage data/loading/error
```

### RTK Query approach

```text
createApi
      ↓
endpoint
      ↓
auto-generated hook
      ↓
data / error / isLoading
      ↓
RTK Query manages fetching and caching
```

---

# 1. API Slice

RTK Query uses `createApi()` to define API endpoints.

```jsx
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
  }),
});
```

### Important concepts

| Part | Purpose |
|---|---|
| `createApi()` | Creates the RTK Query API slice |
| `reducerPath` | Name/path used to store API state in Redux |
| `baseQuery` | Defines how requests are made |
| `fetchBaseQuery()` | Lightweight fetch-based request handler |
| `baseUrl` | Common API URL |
| `endpoints` | Defines the API operations |
| `builder.query()` | Used for GET-style queries |

The base URL:

```text
https://jsonplaceholder.typicode.com
```

The endpoint:

```text
/posts
```

RTK Query combines them to make:

```text
https://jsonplaceholder.typicode.com/posts
```

---

# 2. Automatically Generated Query Hooks

If the endpoint is named:

```jsx
getPosts
```

RTK Query generates:

```jsx
useGetPostsQuery
```

The naming pattern is:

```text
use + EndpointName + Query
```

Example:

```text
getPosts
   ↓
useGetPostsQuery
```

Use it inside a component:

```jsx
const { data, error, isLoading } = useGetPostsQuery();
```

RTK Query automatically provides:

- `data`
- `error`
- `isLoading`

---

# 3. Store Configuration

The API reducer must be added to the Redux store.

```jsx
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
```

### Why add the middleware?

The RTK Query middleware manages features such as:

- caching
- invalidation
- polling/refetch behavior
- request lifecycle behavior

---

# 4. Redux Provider

The application still needs the Redux Provider.

```jsx
<Provider store={store}>
  <App />
</Provider>
```

RTK Query is part of Redux Toolkit, so the application still uses the Redux store.

---

# 5. Multiple GET Endpoints

Multiple GET calls can be defined inside the same API slice.

```jsx
endpoints: (builder) => ({
  getPosts: builder.query({
    query: () => "/posts",
  }),

  getComments: builder.query({
    query: () => "/comments",
  }),

  getUsers: builder.query({
    query: () => "/users",
  }),
})
```

The generated hooks are:

```jsx
useGetPostsQuery()
useGetCommentsQuery()
useGetUsersQuery()
```

This is useful when a page needs several independent API calls.

---

# 6. Multiple API Calls in One Component

A component can use multiple query hooks.

```jsx
const {
  data: postData,
  error: postError,
  isLoading: postLoading,
} = useGetPostsQuery();

const {
  data: commentData,
  error: commentError,
  isLoading: commentLoading,
} = useGetCommentsQuery();
```

The aliases are useful because each hook normally returns properties named `data`, `error`, and `isLoading`.

Without aliases:

```jsx
const { data } = useGetPostsQuery();
const { data } = useGetCommentsQuery();
```

This causes a variable-name conflict.

With aliases:

```jsx
data: postData
data: commentData
```

there is no conflict.

---

# 7. Query vs Mutation

One of the most important RTK Query concepts:

| Operation | RTK Query |
|---|---|
| GET | `builder.query()` |
| POST | `builder.mutation()` |
| PUT/PATCH | `builder.mutation()` |
| DELETE | `builder.mutation()` |

Queries are generally used to retrieve data.

Mutations are used when an operation changes server-side data.

---

# 8. POST Mutation

Example:

```jsx
addPost: builder.mutation({
  query: (newPost) => ({
    url: "/posts",
    method: "POST",
    body: newPost,
  }),
})
```

RTK Query generates:

```jsx
useAddPostMutation
```

A mutation hook returns an array:

```jsx
const [addPost, { isLoading, error }] = useAddPostMutation();
```

The first item is the function that triggers the mutation.

```jsx
await addPost({
  title: "My new post",
  body: "This post was created using RTK Query.",
  userId: 1,
});
```

---

# 9. DELETE Mutation

DELETE is also a mutation.

```jsx
deletePost: builder.mutation({
  query: (postId) => ({
    url: `/posts/${postId}`,
    method: "DELETE",
  }),
})
```

Generated hook:

```jsx
useDeletePostMutation
```

Usage:

```jsx
const [deletePost] = useDeletePostMutation();

await deletePost(postId);
```

---

# 10. Mutation Loading and Error State

Mutation hooks can also provide loading and error information.

```jsx
const [
  addPost,
  {
    isLoading: addPostLoading,
    error: addPostError,
  },
] = useAddPostMutation();
```

This allows the UI to show:

```jsx
{addPostLoading && <p>Adding post...</p>}

{addPostError && <p>Unable to add the post.</p>}
```

---

# 11. Provides Tags and Invalidates Tags

RTK Query can automatically refetch related query data after a mutation.

First define the tag type:

```jsx
tagTypes: ["Posts"]
```

Then provide the tag from the GET query:

```jsx
getPosts: builder.query({
  query: () => "/posts",
  providesTags: ["Posts"],
})
```

Then invalidate the tag from the mutation:

```jsx
addPost: builder.mutation({
  query: (newPost) => ({
    url: "/posts",
    method: "POST",
    body: newPost,
  }),
  invalidatesTags: ["Posts"],
})
```

The idea is:

```text
getPosts
   ↓
providesTags: ["Posts"]

addPost
   ↓
invalidatesTags: ["Posts"]
   ↓
RTK Query knows the Posts data may be stale
   ↓
getPosts is refetched
```

This is useful when the application needs the UI to reflect changed server data automatically.

### Important JSONPlaceholder note

JSONPlaceholder simulates API responses. Its POST and DELETE endpoints do not permanently change the underlying dataset.

Therefore, the example demonstrates the RTK Query behavior correctly, but a refetched `/posts` response may still contain the original posts.

In a real application, the backend would persist the change.

---

# 12. Automatic Refetching

RTK Query provides options for keeping data fresh.

### Refetch when the window receives focus

```jsx
useGetPostsQuery(undefined, {
  refetchOnFocus: true,
});
```

### Refetch when the component mounts or the argument changes

```jsx
useGetPostsQuery(undefined, {
  refetchOnMountOrArgChange: true,
});
```

### Refetch after reconnecting to the network

```jsx
useGetPostsQuery(undefined, {
  refetchOnReconnect: true,
});
```

These are useful when the displayed data can change while the user is away from the page.

---

# 13. setupListeners

For `refetchOnFocus` and `refetchOnReconnect`, add:

```jsx
import { setupListeners } from "@reduxjs/toolkit/query";

setupListeners(store.dispatch);
```

Example:

```jsx
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
```

---

# 14. Skip an API Request

Sometimes an API call should not happen until required information is available.

For example, suppose a query needs a post ID.

```jsx
const { data } = useGetPostQuery(postId, {
  skip: !postId,
});
```

If `postId` is `null` or `undefined`, the request is skipped.

This is useful when:

- an ID comes from a form
- a route parameter is not available yet
- a required value has not been selected
- an API request should only happen after a condition is met

---

# 15. RTK Query Form Example

The project in this folder also demonstrates a complete form workflow.

```text
Product/Post Form
       ↓
GET posts
       ↓
Display posts
       ↓
Enter title/body
       ↓
Submit form
       ↓
POST mutation
       ↓
Loading / error / response
       ↓
Invalidate Posts tag
       ↓
RTK Query refetches posts
```

The important part is that the component does not need:

```jsx
useEffect()
useDispatch()
useSelector()
createAsyncThunk()
extraReducers()
```

for this API workflow.

---

# 16. RTK Query vs createAsyncThunk

| Redux Toolkit API Calls | RTK Query |
|---|---|
| `createAsyncThunk` | `createApi` |
| `extraReducers` | Automatic request state |
| Manual loading state | `isLoading` |
| Manual error state | `error` |
| `useDispatch()` | Query/mutation hook |
| `useSelector()` | `data` from hook |
| Manual API state | RTK Query API cache |
| More handwritten code | Less handwritten code |
| Manual refetch logic | Tags/refetch options |

RTK Query is particularly useful when the application is heavily based on server data fetching, caching, synchronization, and mutations.

---

# 17. RTK Query vs Context API + useReducer

Context API and `useReducer` are useful for managing application state inside React.

RTK Query is specifically designed around server/API data.

A simplified way to think about the difference:

```text
useState
Context API
useReducer
Redux
        ↓
Application state
```

versus:

```text
RTK Query
        ↓
Server/API state
```

An application can use both approaches when appropriate.

---

# 18. TanStack Query

TanStack Query is another library for server-state management.

It provides features such as:

- data fetching
- caching
- synchronization
- refetching
- mutations

A major architectural difference is that TanStack Query does not require Redux.

RTK Query is integrated into Redux Toolkit, while TanStack Query is a separate library.

The choice depends on the application's existing architecture and team requirements.

---

# Key Takeaways

1. `createApi()` creates an RTK Query API slice.
2. `builder.query()` is used for GET requests.
3. `builder.mutation()` is used for POST, PUT/PATCH, and DELETE operations.
4. RTK Query automatically generates React hooks.
5. Query hooks return values such as `data`, `error`, and `isLoading`.
6. Mutation hooks return a trigger function plus mutation state.
7. `providesTags` and `invalidatesTags` help keep cached data synchronized.
8. `refetchOnFocus`, `refetchOnMountOrArgChange`, and `refetchOnReconnect` support automatic refetching.
9. `setupListeners(store.dispatch)` enables focus/reconnect listener behavior.
10. `skip` can prevent a request when required data is unavailable.
11. RTK Query removes much of the repetitive API state-management code used with `createAsyncThunk`.
