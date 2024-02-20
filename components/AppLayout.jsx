import { useUser } from "@auth0/nextjs-auth0/client";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { useContext, useEffect } from "react";
import PostsContext from "../context/PostsContext";

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
      <NavBar />
      {children}
    </div>
  );
};

const SideBar = ({ postId, user, posts, availableToken, noMorePosts, getPosts }) => {
  return (
    <div className="hidden lg:flex flex-col bg-gradient-b text-white overflow-hidden">
      <div className="px-2">
        <Logo />
        <Link
          href="/post/new"
          className="btn btn-secondary w-full text-xl hover:no-underline"
        >
          New Post
        </Link>
        <Link href="/token-topup" className="block mt-2 text-center">
          <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
          <span className="pl-1">{availableToken} tokens available</span>
        </Link>
      </div>
      <div className="px-4 flex-1 flex flex-col gap-1 overflow-auto">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/post/${post._id}`}
            className={`py-1 text-ellipsis overflow-hidden whitespace-nowrap block hover:bg-white/40 hover:no-underline p-2 rounded-md ${
              postId === post._id ? "bg-white/40" : "border-white/0"
            }`}
          >
            {post.topic}
          </Link>
        ))}
        {!noMorePosts && (
          <div
            onClick={() => {
              getPosts({ lastPostDate: posts[posts.length - 1].created });
            }}
            className="hover:underline text-sm text-base-200 text-center cursor-pointer mt-4"
          >
            Load More Posts
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-t-white h-20 px-2">
        {user ? (
          <>
            <div className="min-w-[50px]">
              <Image
                src={user.picture}
                alt={user.name}
                height={50}
                width={50}
                className="rounded-full"
              />
            </div>
            <div className="flex-1 font-extrabold text-base-200">
              <div>{user.email}</div>
              <Link
                className="text-sm hover:no-underline"
                href="/api/auth/logout"
              >
                Logout
              </Link>
            </div>
          </>
        ) : (
          <Link href="/api/auth/login">Login</Link>
        )}
      </div>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="lg:hidden h-[8rem] flex items-center justify-between px-8 bg-gradient-r">
      <Logo />
      <div className="">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="text-xl">
            DropDown Button
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
