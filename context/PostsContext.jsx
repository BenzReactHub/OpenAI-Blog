import { createContext, useCallback, useReducer, useState } from "react";

const PostsContext = createContext({});

function postsReducer(state, action) {
  switch (action.type) {
    case "addPost":
      const existingPostIds = new Set(state.map((post) => post._id));
      const newPosts = action.posts.filter((post) => !existingPostIds.has(post._id))
      return [...state, ...newPosts];

    case "deletePost":
      return state.filter((post) => post._id !== action.postId);
    default:
      return state;
  }
}

export const PostsProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(postsReducer, []);
  const [noMorePosts, setNoMorePosts] = useState(false);

  const deletePost = useCallback((postId) => {
    dispatch({ type: "deletePost", postId });
  }, []);

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    dispatch({ type: "addPost", posts: postsFromSSR });
  }, []);

  const getPosts = useCallback(
    async ({ lastPostDate, getNewerPosts = false }) => {
      const result = await fetch(`/api/getPosts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ lastPostDate, getNewerPosts }),
      }).then((res) => res.json());
      const postsResult = result.posts || [];
      if (postsResult.length < 5) {
        setNoMorePosts(true);
      }
      dispatch({ type: "addPost", posts: postsResult });
    },
    []
  );

  return (
    <PostsContext.Provider
      value={{ posts, setPostsFromSSR, getPosts, noMorePosts, deletePost }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
