import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiArticleMediumBold } from "react-icons/pi";
import Logo from "./Logo";
import Posts from "./Posts";
import Profile from "./Profile";
import Tokens from "./Tokens";

// refactor context
// postId
// availableToken
const Nav = ({
  postId,
  user,
  posts,
  availableToken,
  noMorePosts,
  getPosts,
}) => {
  return (
    <>
      <Nav.Mobile
        postId={postId}
        user={user}
        posts={posts}
        availableToken={availableToken}
        noMorePosts={noMorePosts}
        getPosts={getPosts}
      />
      <Nav.Desktop
        postId={postId}
        user={user}
        posts={posts}
        availableToken={availableToken}
        noMorePosts={noMorePosts}
        getPosts={getPosts}
      />
    </>
  );
};

const Mobile = ({
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
        <Profile user={user} />
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

const Desktop = ({
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
      <Profile user={user} />
    </div>
  );
};

Nav.Mobile = Mobile;
Nav.Desktop = Desktop;

export default Nav;
