import { createContext, useCallback, useState } from "react";

const PostsContext = createContext({});

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    setPosts(postsFromSSR);
  }, []);

  const getPosts = useCallback(async ({ lastPostDate }) => {
    const result = await fetch(`/api/getPosts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ lastPostDate }),
    }).then((res) => res.json());
    const postsResult = result.posts || [];
    setPosts((prevPosts) => {
      const existingPostIds = new Set(prevPosts.map((post) => post._id));
      const newPosts = postsResult.filter(
        (post) => !existingPostIds.has(post._id)
      );
      return [...prevPosts, ...newPosts];
    });
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPostsFromSSR, getPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
