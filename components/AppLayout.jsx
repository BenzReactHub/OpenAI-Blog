import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiArticleMediumBold } from "react-icons/pi";
import PostsContext from "../context/PostsContext";
import Logo from "./Logo";
import Posts from "./Posts";
import Profile from "./Profile";
import Tokens from "./Tokens";

const AppLayout = ({
  children,
  availableToken,
  posts: postsFromSSR,
  postCreated,
  postId,
}) => {
  const { user } = useUser();

  const { setPostsFromSSR, posts, getPosts, noMorePosts } =
    useContext(PostsContext);

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
      <SideBar
        postId={postId}
        user={user}
        posts={posts}
        availableToken={availableToken}
        noMorePosts={noMorePosts}
        getPosts={getPosts}
      />
      <NavBar
        postId={postId}
        user={user}
        posts={posts}
        availableToken={availableToken}
        noMorePosts={noMorePosts}
        getPosts={getPosts}
      />
      {children}
    </div>
  );
};

const SideBar = ({
  postId,
  user,
  posts,
  availableToken,
  noMorePosts,
  getPosts,
}) => {
  return (
    <div className="hidden lg:flex flex-col bg-gradient-b text-white overflow-hidden px-4">
      <div>
        <Logo />
        <Link
          href="/post/new"
          className="btn btn-secondary w-full text-xl hover:no-underline"
        >
          New Post
        </Link>
        <Tokens availableToken={availableToken} />
      </div>
      <Posts
        posts={posts}
        postId={postId}
        getPosts={getPosts}
        noMorePosts={noMorePosts}
      />
      <Profile user={user}/>
    </div>
  );
};

const NavBar = ({
  posts,
  postId,
  user,
  availableToken,
  noMorePosts,
  getPosts,
}) => {
  return (
    <div className="lg:hidden h-[6rem] flex items-center justify-between px-8 bg-gradient-r">
      <Logo />
      <div className="flex items-center gap-3">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="text-xl">
            <PiArticleMediumBold className="text-3xl" />
          </div>
          <Posts
            posts={posts}
            postId={postId}
            getPosts={getPosts}
            noMorePosts={noMorePosts}
          />
        </div>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Tokens availableToken={availableToken} />
          </div>
        </div>
        <Profile user={user}/>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="text-xl">
            <GiHamburgerMenu className="text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] shadow bg-base-100 rounded-box w-[8rem]"
          >
            <li>
              <Link href="/post/new" className="btn btn-outline btn-info">
                New Post
              </Link>
            </li>
            <li>
              <Link
                href="/api/auth/logout"
                className="btn btn-outline btn-error"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
