"use client";
import { ConfigProvider, message } from "antd";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { SetCurrentUser } from "@/redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { SetLoading } from "@/redux/loadersSlice";
import Image from "next/image";

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
                        <Image
                          src="https://flowbite.com/docs/images/logo.svg"
                          className="h-8 mr-3"
                          alt="Flowbite Logo"
                          width={24}
                          height={24}
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
                          <Image
                            className="w-8 h-8 rounded-full"
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMjZlMDdmOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjMWZiMTQxIj48cGF0aCBkPSJNMjEuNSwyMS41djEyOWg2NC41di0zMi4yNXYtNjQuNXYtMzIuMjV6TTg2LDUzLjc1YzAsMTcuNzgwNSAxNC40Njk1LDMyLjI1IDMyLjI1LDMyLjI1YzE3Ljc4MDUsMCAzMi4yNSwtMTQuNDY5NSAzMi4yNSwtMzIuMjVjMCwtMTcuNzgwNSAtMTQuNDY5NSwtMzIuMjUgLTMyLjI1LC0zMi4yNWMtMTcuNzgwNSwwIC0zMi4yNSwxNC40Njk1IC0zMi4yNSwzMi4yNXpNMTE4LjI1LDg2Yy0xNy43ODA1LDAgLTMyLjI1LDE0LjQ2OTUgLTMyLjI1LDMyLjI1YzAsMTcuNzgwNSAxNC40Njk1LDMyLjI1IDMyLjI1LDMyLjI1YzE3Ljc4MDUsMCAzMi4yNSwtMTQuNDY5NSAzMi4yNSwtMzIuMjVjMCwtMTcuNzgwNSAtMTQuNDY5NSwtMzIuMjUgLTMyLjI1LC0zMi4yNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
                            alt="user photo"
                            width={24}
                            height={24}
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
