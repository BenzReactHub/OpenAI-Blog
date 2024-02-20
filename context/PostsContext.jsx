import { createContext, useCallback, useState } from "react";

const PostsContext = createContext({});

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [noMorePosts, setNoMorePosts] = useState(false);

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    setPosts((prevPosts) => {
      const existingPostIds = new Set(prevPosts.map((post) => post._id));
      const newPosts = postsFromSSR.filter(
        (post) => !existingPostIds.has(post._id)
      );
      return [...prevPosts, ...newPosts];
    });
  }, []);

  const getPosts = useCallback(async ({ lastPostDate, getNewerPosts = false }) => {
    const result = await fetch(`/api/getPosts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ lastPostDate, getNewerPosts }),
    }).then((res) => res.json());
    const postsResult = result.posts || [];
    if(postsResult.length < 5) {
      setNoMorePosts(true)
    }
    setPosts((prevPosts) => {
      const existingPostIds = new Set(prevPosts.map((post) => post._id));
      const newPosts = postsResult.filter(
        (post) => !existingPostIds.has(post._id)
      );
      return [...prevPosts, ...newPosts];
    });

  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPostsFromSSR, getPosts, noMorePosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
