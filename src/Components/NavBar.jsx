"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserContext } from "@/Contexts/UserContext";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const objProps = Object.keys(user);
    setIsLoggedIn(objProps.length !== 0);
  }, [user]);

  const isLogin = () => {
    const objProps = Object.keys(user);
    return objProps.length != 0;
  };

  const handleLogout = () => {
    router.push("/");
    setUser({});
  };

  return (
    <nav className="sticky top-0 p-2 text-lg font-bold font-navBarFont drop-shadow-2xl dark:bg-zinc-800 dark:text-gray-200 bg-gray-300">
      <div className="flex item-start justify-between px-2">
        <div className="text-2xl">
          <Link href="/">LogoImage</Link>
        </div>

        <div className="flex items-center">
          {isMenuOpen ? null : (
            <div className="lg:hidden">
              <button
                onClick={() => {
                  setIsMenuOpen(true);
                }}
                className="text-2xl border-4 dark:border-gray-200 border-black p-1 rounded-full"
              >
                Menu
              </button>
            </div>
          )}

          <div className="lg:flex">
            {isMenuOpen ? (
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-center text-lg border-4 dark:border-gray-200 border-black p-1 rounded-full"
                >
                  Close
                </button>
              </div>
            ) : null}

            <ul
              className={`lg:flex lg:flex-row lg:items-center lg:justify-center lg:space-x-5
              ${isMenuOpen ? `flex flex-col` : `hidden`}
              `}
            >
              <li>
                <Link href="/">Sales</Link>
              </li>
              {isLoggedIn && (
                <>
                  <li>
                    <Link href="/cart">
                      <IoCartOutline size="1.7em" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/myOrders">
                      My Orders
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link href="/login">LogIn</Link>
                </li>
              )}
              {!isLoggedIn && (
                <li>
                  <Link href="/signup">SignUp</Link>
                </li>
              )}
              {/* {isLogin() && user.theRole === "admin" && ( */}
                <li>
                  <Link href="/admin">Admin</Link>
                </li>
              {/* )} */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
