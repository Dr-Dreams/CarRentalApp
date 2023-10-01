"use client";
import {
  emailValidationRule,
  passwordValidationRule,
} from "@/helpers/validationHelpers";
import { Button, Form, message, Checkbox } from "antd";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/users/login", values);
      message.success(response.data.message);
      router.push("/");
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <>
      <div>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Bharat Car Rental
            </a>
            <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-4 md:space-y-6">
                  {/* Email  */}
                  <Form.Item
                    label={
                      <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                        Email
                      </p>
                    }
                    name="email"
                    rules={emailValidationRule}>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </Form.Item>

                  {/* Password */}
                  <Form.Item
                    label={
                      <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                        Password
                      </p>
                    }
                    hasFeedback
                    name="password">
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </Form.Item>

                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      {/* remember me */}
                      <Form.Item name="remember me" valuePropName="checked">
                        <Checkbox>
                          <div className="ml-1 text-base">
                            <p className="text-gray-500 dark:text-gray-300">
                              remember me
                            </p>
                          </div>
                        </Checkbox>
                      </Form.Item>
                    </div>
                    {/* <Link
                      href="/forgotpassword"
                      className="font-medium text-blue-600 hover:underline dark:text-primary-500">
                      Forgot Password
                    </Link> */}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="primary"
                    block
                    size="large"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    htmlType="submit">
                    Sign In
                  </Button>

                  {/* Sign Up Page Link */}
                  <p className="text-base font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      href="/register"
                      className="font-medium text-blue-600 hover:underline dark:text-primary-500">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
