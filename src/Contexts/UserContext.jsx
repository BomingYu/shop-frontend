"use client";

import React, { useContext, useState } from "react";
import { Cookies, useCookies } from "react-cookie";

const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setCurrentUser] = useState(cookies.user ? cookies.user : {});

  const setUser = (newUser) => {
    if (newUser.token) {
      setCookie("user", JSON.stringify(newUser), {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    } else {
      removeCookie("user");
    }
    setCurrentUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
