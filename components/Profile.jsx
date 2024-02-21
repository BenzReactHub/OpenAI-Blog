import Image from "next/image";
import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi2";

const Profile = ({ user }) => {
  return (
    <>
      <Profile.Mobile user={user}/>
      <Profile.Desktop user={user}/>
    </>
  );
};

const Mobile = ({ user }) => {
  return (
    <div className="lg:hidden dropdown dropdown-end">
      <div tabIndex={0} role="button" className="text-xl">
        <HiOutlineUser className="text-3xl" />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content z-[1] shadow bg-base-100 pr-8 rounded-box overflow-auto flex flex-col items-start px-2"
      >
        <li>
          <div className="flex">
            <Image
              src={user?.picture}
              alt={user?.name}
              height={25}
              width={25}
              className="rounded-full"
            />
            <span className="">{user?.email}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
const Desktop = ({ user }) => {
  return (
    <div className="hidden lg:flex items-center gap-2 border-t border-t-white h-36">
      {user ? (
        <div className="flex flex-col gap-2 m-auto w-full">
          <div className="flex items-center gap-2">
            <Image
              src={user.picture}
              alt={user.name}
              height={50}
              width={50}
              className="rounded-full min-w-[50px]"
            />
            <div className="flex-1 font-extrabold text-base-200">
              <div>{user?.email}</div>
            </div>
          </div>
          <Link
            href="/api/auth/logout"
            className="btn bg-indigo-500/80 border-indigo-500 text-red-100 hover:no-underline hover:bg-white hover:text-indigo-500/80"
          >
            Logout
          </Link>
        </div>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
    </div>
  );
};

Profile.Mobile = Mobile;
Profile.Desktop = Desktop;

export default Profile;
