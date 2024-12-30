"use client";

import React, { useEffect, useState } from "react";
import Button from "./Button";
import { logout } from "@/lib/features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BsTruck } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import LightSpinner from "./LightSpinner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import Headline from "./Headline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PiSignIn } from "react-icons/pi";

function Header() {
  const status = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();
  const [sidebar, setSidebar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fullPath, setFullPath] = useState("/");

  const handleLogout = async () => {
    try {
      setLoader(true);
      await axios.get("/api/v1/users/logout", {
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        withCredentials: true,
      });
      dispatch(logout());
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("category"))
      setFullPath(`${pathname}?${searchParams.toString()}`);
    else setFullPath(pathname);
  }, [pathname, searchParams]);

  const activeClasses = (isActive: string) =>
    `py-1 text-[12px] uppercase dark:text-white after:dark:bg-white font-normal text-gray-700 relative transition after:h-[3px] after:bg-primary-color hover:text-primary-color after:rounded-full after:w-0 after:absolute after:content-[''] after:bottom-0 after:transition-all after:left-0 hover:after:w-[100%] ${
      isActive === fullPath ? "after:w-[100%] text-primary-color" : ""
    }`;

  return (
    !(fullPath === "/signin") && (
      <>
        <Headline />
        {
          <div
            className={`fixed w-[100vw] h-[100vh] text-black top-0 ${
              !openModal
                ? "bg-opacity-0 backdrop-blur-0 -z-30"
                : "bg-opacity-50 backdrop-blur-md z-50"
            } flex items-center justify-center bg-black duration-0`}
          >
            <div
              className={`${
                openModal ? "md:w-[30%] w-[90%] h-[30%]" : "w-0 h-0"
              } overflow-hidden bg-[#f1f1f1] rounded-lg shadow-md flex flex-col items-center justify-center gap-6 z-50`}
            >
              {openModal && (
                <>
                  <div className="uppercase text-sm font-medium text-center z-40 dark:text-white">
                    Are You Sure You Want To Logout ?
                  </div>
                  <div className="flex items-center justify-center gap-6 w-full">
                    <button
                      className="w-24 h-10 bg-red-400 rounded-md hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600 text-sm font-medium"
                      onClick={() => handleLogout()}
                      disabled={loader}
                    >
                      {loader ? <LightSpinner color={""} /> : "Yes"}
                    </button>
                    <button
                      className="w-24 h-10 bg-green-400 rounded-md hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600 text-sm font-medium"
                      onClick={() => setOpenModal(false)}
                      disabled={loader}
                    >
                      No
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        }
        <nav
          className={`w-full dark:border-0 md:h-[20vh] h-[8vh] animate-animate-appear sticky border-b-[1px] top-0 left-0 z-50 flex items-center md:justify-between justify-center md:gap-0 gap-4 shadow-sm bg-white dark:bg-primary-color dark:text-white`}
        >
          <div
            className="md:hidden cursor-pointer text-gray-500"
            onClick={() => setSidebar((prev) => !prev)}
          >
            <FontAwesomeIcon
              icon={faBars}
              className="size-6 absolute top-3 left-4"
            />
          </div>

          <div className="w-[100%] h-full hidden md:flex flex-col items-center justify-center gap-5 divide-y-2">
            <div className="w-full h-fit flex items-center justify-between px-16">
              <div className="w-[30%]">
                <Link
                  href="/search"
                  className={`hover:bg-secondary-color hover:text-primary-color ${
                    "/search" === fullPath &&
                    "bg-secondary-color text-primary-color"
                  } transition px-2 py-2 rounded-full relative text-gray-700`}
                >
                  <IoIosSearch size="22" className="inline mr-2" />
                  <span className="inline text-xs">Search</span>
                </Link>
              </div>
              <Image
                alt=""
                width={1000}
                height={1000}
                src={"/logo.avif"}
                className="md:w-[20%] w-[60%] h-fit md:mx-auto cursor-pointer"
                onClick={() => router.push("/")}
              />

              <div className="w-[30%] h-full hidden md:block">
                <ul className="w-full h-full flex items-center pl-16 justify-end gap-4 font-semibold text-xl">
                  {status && (
                    <Link
                      href="/cart"
                      className={`hover:bg-secondary-color hover:text-primary-color ${
                        "/cart" === fullPath &&
                        "bg-secondary-color text-primary-color"
                      } transition px-2 py-2 rounded-full relative text-gray-700`}
                    >
                      <IoCartOutline size="22" />
                    </Link>
                  )}
                  {status && (
                    <>
                      <Link
                        href="/orders"
                        className={`hover:bg-secondary-color hover:text-primary-color hover:dark:bg-blue-950 ${
                          "/orders" === fullPath &&
                          "bg-secondary-color text-primary-color dark:bg-blue-950"
                        } transition px-2 py-2 rounded-full relative text-gray-700`}
                      >
                        <BsTruck size="22" />
                      </Link>
                      <Link
                        onClick={() => setOpenModal(true)}
                        href="#"
                        className={`hover:bg-secondary-color hover:text-primary-color hover:dark:bg-blue-950 transition px-2 py-2 rounded-full relative text-gray-700`}
                      >
                        <IoExitOutline size="22" />
                      </Link>
                    </>
                  )}
                  {!status && (
                    <>
                      <Link href="/signin">
                        <Button className="py-2 px-2 text-sm">
                          Sign In
                          <PiSignIn className="inline ml-1" />
                        </Button>
                      </Link>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <ul className="w-full h-fit flex items-center justify-center gap-14 font-semibold text-md pt-4 tracking-wider font-lato">
              <Link href="/" className={activeClasses("/")}>
                Trending
              </Link>
              <Link
                href={"/shop?category=Straight"}
                className={activeClasses("/shop?category=Straight")}
              >
                Straight Abayas
              </Link>
              <Link
                href={"/shop?category=Umbrella"}
                className={activeClasses("/shop?category=Umbrella")}
              >
                Umbrella Abayas
              </Link>
              <Link
                href={"/shop?category=Tye Dye"}
                className={activeClasses("/shop?category=Tye Dye")}
              >
                Tye Dye Abayas
              </Link>
              <Link
                href={"/shop?category=Farasha"}
                className={activeClasses("/shop?category=Farasha")}
              >
                Farasha Abayas
              </Link>
              <Link
                href="/policies/aboutus"
                className={activeClasses("/policies/aboutus")}
              >
                About Us
              </Link>
              <Link
                href="/policies/contact"
                className={activeClasses("/policies/contact")}
              >
                Contact Us
              </Link>
            </ul>
          </div>

          <Link href={"/search"} className="md:hidden absolute top-3 right-4">
            <FontAwesomeIcon
              icon={faSearch}
              className="size-6 cursor-pointer text-gray-500"
            />
          </Link>
          <div
            className={`md:hidden absolute ${
              sidebar ? "w-[100vw]" : "w-0"
            } z-20 bg-black bg-opacity-50 overflow-hidden overscroll-x-contain h-[100vh] overscroll-contain left-0 top-[8vh]`}
            onClick={() => {
              setSidebar(false);
            }}
          >
            <div
              className={`bg-gray-100 dark:bg-secondary-color divide-y-2 flex flex-col items-start ${
                sidebar ? "w-[80%]" : "w-0"
              } ease-in-out duration-300 transition-all overflow-hidden shadow-sm h-full text-gray-500 justify-start`}
            >
              {sidebar && (
                <>
                  <Link
                    href={"/"}
                    className="w-full min-w-fit py-4 px-6 text-sm"
                  >
                    Home
                  </Link>
                  <Link
                    href={"/shop?category=Straight"}
                    className="w-full py-4 px-6 min-w-fit text-sm"
                  >
                    Straight Abaya
                  </Link>
                  <Link
                    href={"/shop?category=Umbrella"}
                    className="w-full py-4 px-6 min-w-fit text-sm"
                  >
                    Umbrella Abaya
                  </Link>
                  <Link
                    href={"/shop?category=Farasha"}
                    className="w-full py-4 px-6 min-w-fit text-sm"
                  >
                    Farasha Abaya
                  </Link>
                  <Link
                    href={"/shop?category=Tye Dye"}
                    className="w-full py-4 px-6 min-w-fit text-sm"
                  >
                    Tye Dye Abaya
                  </Link>
                  <Link
                    href={"/policies/contact"}
                    className="w-full py-4 px-6 min-w-fit text-sm"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href={"/policies/aboutus"}
                    className="w-full py-4 px-6 min-w-fit text-sm"
                  >
                    About
                  </Link>
                  {!status ? (
                    <>
                      <Link
                        href={"/signin"}
                        className="w-full py-4 px-6 text-sm"
                      >
                        <Button className="w-full">Sign In</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href="/orders" className="w-full py-4 px-6 text-sm">
                        My Orders
                      </Link>
                      <Link href="/cart" className="w-full py-4 px-6 text-sm">
                        My Cart
                      </Link>
                      <Link
                        href="#"
                        onClick={() => setOpenModal(true)}
                        className="w-full py-4 px-6 text-sm"
                      >
                        Log Out
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>
      </>
    )
  );
}

export default Header;
