import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { usePosts } from "../context/PostsContext";
import Nav from "./NavBar/Nav";

const AppLayout = ({
  children,
  availableToken,
  posts: postsFromSSR,
  postCreated,
  postId,
}) => {
  const { user } = useUser();

  const { setPostsFromSSR, posts, getPosts, noMorePosts } = usePosts();

  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
    if (postId) {
      const exists = postsFromSSR.find((post) => post._id === postId);
      if (!exists) {
        getPosts({ getNewerPosts: true, lastPostDate: postCreated });
      }
    }
  }, [postsFromSSR, setPostsFromSSR, postId, postCreated, getPosts]);

  return (
    <div className="grid gird-cols-1 lg:grid-cols-[300px_1fr] h-screen max-h-screen">
      <Nav
        postId={postId}
        availableToken={availableToken}
        user={user}
        posts={posts}
        noMorePosts={noMorePosts}
        getPosts={getPosts}
      />
      {children}
    </div>
  );
};

export default AppLayout;
