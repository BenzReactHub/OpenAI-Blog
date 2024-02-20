import { createContext, useCallback, useState } from "react";

const PostsContext = createContext({});

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

    const setPostsFromSSR = useCallback((postsFromSSR = []) => {
        setPosts(postsFromSSR)
    }, [])

  return (
    <PostsContext.Provider value={{ posts, setPostsFromSSR }}>{children}</PostsContext.Provider>
  );
};

export default PostsContext;