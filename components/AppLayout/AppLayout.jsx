import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const AppLayout = ({ children }) => {
  const { user } = useUser();
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-white overflow-hidden">
        <div className="bg-slate-800">
          <div>Logo</div>
          <div>cta button</div>
          <div>tokens</div>
        </div>
        <div className="flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-600">
          list of posts
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
                <Link className="text-sm" href="/api/auth/logout">Logout</Link>
              </div>
            </>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AppLayout;
