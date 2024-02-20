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
  postId,
}) => {
  const { user } = useUser();

  const { setPostsFromSSR, posts } = useContext(PostsContext);

  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
  }, [postsFromSSR, setPostsFromSSR]);

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-white overflow-hidden">
        <div className="bg-slate-800 px-2">
          <Logo />
          <Link href="/post/new" className="btn">
            New Post
          </Link>
          <Link href="/token-topup" className="block mt-2 text-center">
            <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
            <span className="pl-1">{availableToken} tokens available</span>
          </Link>
        </div>
        <div className="px-4 flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-600">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/post/${post._id}`}
              className={`py-1 border block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${
                postId === post._id
                  ? "bg-white/40 border-white"
                  : "border-white/0"
              }`}
            >
              {post.topic}
            </Link>
          ))}
          <div className="hover:underline text-sm text-slate-400 text-center cursor-pointer mt-4">
            Load More Posts
          </div>
        </div>
        <div className="bg-cyan-600 flex items-center gap-2 border-t border-t-white h-20 px-2">
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
              <div className="flex-1 font-extrabold">
                <div>{user.email}</div>
                <Link className="text-sm" href="/api/auth/logout">
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
