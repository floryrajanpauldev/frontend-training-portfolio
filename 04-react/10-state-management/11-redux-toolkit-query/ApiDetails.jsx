import { useState } from "react";
import {
  useGetPostsQuery,
  useGetCommentsQuery,
  useGetUsersQuery,
  useAddPostMutation,
  useDeletePostMutation,
} from "./api";

function ApiDetails() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(1);

  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
  } = useGetPostsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: commentData,
    error: commentError,
    isLoading: commentLoading,
  } = useGetCommentsQuery();

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUsersQuery();

  const [
    addPost,
    {
      isLoading: addPostLoading,
      error: addPostError,
    },
  ] = useAddPostMutation();

  const [
    deletePost,
    {
      isLoading: deletePostLoading,
      error: deletePostError,
    },
  ] = useDeletePostMutation();

  const handleAddPost = async (event) => {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      return;
    }

    try {
      const response = await addPost({
        title,
        body,
        userId: Number(userId),
      }).unwrap();

      console.log("POST response:", response);

      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Unable to add post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await deletePost(postId).unwrap();

      console.log("DELETE response:", response);
    } catch (error) {
      console.error("Unable to delete post:", error);
    }
  };

  if (postLoading || commentLoading || userLoading) {
    return <p>Loading API data...</p>;
  }

  if (postError || commentError || userError) {
    return <p>Something went wrong while loading API data.</p>;
  }

  return (
    <div className="page">
      <h1>RTK Query Demo</h1>

      <section className="card">
        <h2>Add Post</h2>

        <form onSubmit={handleAddPost}>
          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter post title"
            />
          </label>

          <label>
            Body
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Enter post body"
              rows="4"
            />
          </label>

          <label>
            User ID
            <input
              type="number"
              min="1"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />
          </label>

          <button type="submit" disabled={addPostLoading}>
            {addPostLoading ? "Adding..." : "Add Post"}
          </button>
        </form>

        {addPostError && (
          <p className="error">Unable to add the post.</p>
        )}
      </section>

      <section className="card">
        <h2>Posts</h2>

        {deletePostLoading && <p>Deleting post...</p>}

        {deletePostError && (
          <p className="error">Unable to delete the post.</p>
        )}

        <ul>
          {postData?.slice(0, 10).map((post) => (
            <li key={post.id}>
              <div>
                <strong>{post.title}</strong>
                <p>{post.body}</p>
              </div>

              <button
                type="button"
                onClick={() => handleDeletePost(post.id)}
                disabled={deletePostLoading}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Comments</h2>

        {commentData?.slice(0, 10).map((comment) => (
          <p key={comment.id}>
            {comment.email}
          </p>
        ))}
      </section>

      <section className="card">
        <h2>Users</h2>

        {userData?.map((user) => (
          <p key={user.id}>
            {user.name} — {user.email}
          </p>
        ))}
      </section>
    </div>
  );
}

export default ApiDetails;
