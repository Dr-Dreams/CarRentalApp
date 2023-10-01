"use client";
import { ConfigProvider, message } from "antd";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { SetCurrentUser } from "@/redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { SetLoading } from "@/redux/loadersSlice";

function LayoutProvider({ children }) {
  const { currentUser } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.loaders);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/users/currentuser");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.get("/api/users/logout");
      message.success("User logged out successfully");
      router.push("/login");
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (pathname !== "/login" && pathname !== "/register") {
      getCurrentUser();
    }
  }, [pathname]);

  return (
    <>
      <html lang="en">
        <head>
          <link
            href="https://cdn.jsdelivr.net/npm/remixicon@3.4.0/fonts/remixicon.css"
            rel="stylesheet"></link>
        </head>
        <body className="bg-gray-50 dark:bg-gray-900 text-black">
          {loading && <Spinner />}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#000",
              },
            }}>
            {pathname !== "/login" && pathname !== "/register" && (
              <div>
                {/* navBar */}
                <div>
                  <nav className="bg-gray-50 border-gray-700 dark:bg-gray-900 border-b-2 ">
                    <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
                      <button
                        onClick={() => {
                          router.push("/");
                        }}
                        className="flex items-center cursor-pointer">
                        <img
                          src="https://flowbite.com/docs/images/logo.svg"
                          className="h-8 mr-3"
                          alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                          Bharat Car Rental
                        </span>
                      </button>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => {
                            router.push("/profile");
                          }}
                          className="text-base rounded-full"
                          id="profile-button"
                          aria-expanded="false">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                            alt="user photo"
                          />
                          <p className="ml-[-20px] text-black dark:text-white font-medium  text-base text-center mr-8 flex">
                            {currentUser?.name}
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={onLogout}
                          className=" mt-[-16px] text-white text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full  px-4 py-2  text-center mr-8 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Logout
                        </button>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>

              // <div className="header p-5 flex justify-between items-center bg-gray-900 ">
              //   <h1
              //     className="text-xl text-white cursor-pointer"
              //     onClick={() => {
              //       router.push("/");
              //     }}>
              //     Bharat Car Rental
              //   </h1>

              //   <div className="flex gap-5 items-center">
              //     <h1
              //       className="text-md text-white underline"
              //       onClick={() => {
              //         router.push("/profile");
              //       }}>
              //       {currentUser?.name}
              //     </h1>
              //     <i
              //       className="ri-logout-box-r-line text-white"
              //       onClick={onLogout}></i>
              //   </div>
              // </div>
            )}

            <div>{children}</div>
          </ConfigProvider>
        </body>
      </html>
    </>
  );
}

export default LayoutProvider;
