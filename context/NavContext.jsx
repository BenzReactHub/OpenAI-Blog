import React, { createContext, useContext } from "react";

const NavContext = createContext();

export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined)
    throw new Error("NavContext was used outside of the NavProvider!");
  return context;
}

const NavProvider = ({ user, postId, availableToken, children }) => {
  return <NavContext.Provider value={{ user, postId, availableToken }}>{children}</NavContext.Provider>;
};
export default NavProvider;
