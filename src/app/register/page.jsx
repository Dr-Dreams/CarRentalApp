"use client";
import {
  textValidationRule,
  confirmPasswordValidationRule,
  emailValidationRule,
  passwordValidationRule,
} from "@/helpers/validationHelpers";
import { Button, Form, message, Checkbox } from "antd";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  // OnFinish Method
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/users/register", values);
      message.success(response.data.message);
      router.push("/login");
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };
  return (
    // Register Page UI start
    <>
      <div>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <Image
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
                width={24}
                height={24}
              />
              Bharat Car Rental
            </a>

            <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
                </h1>

                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-4 md:space-y-6">
                  {/* Name */}
                  <Form.Item
                    label={
                      <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                        Name
                      </p>
                    }
                    rules={textValidationRule}
                    name="name">
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </Form.Item>

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
                    name="password"
                    rules={passwordValidationRule}>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </Form.Item>

                  {/* Confirm Password */}
                  <Form.Item
                    label={
                      <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                        Confirm Password
                      </p>
                    }
                    dependencies={["password"]}
                    hasFeedback
                    name="confirm password"
                    rules={confirmPasswordValidationRule}>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </Form.Item>

                  {/* Agreement */}
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Should accept agreement")
                              ),
                      },
                    ]}>
                    <Checkbox>
                      <div className="ml-1 text-base">
                        <p className="font-light text-gray-500 dark:text-gray-300">
                          I have read the{" "}
                          <a
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                            href="#">
                            agreement
                          </a>
                        </p>
                      </div>
                    </Checkbox>
                  </Form.Item>

                  {/* Submit Button */}
                  <Button
                    type="primary"
                    block
                    size="large"
                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    htmlType="submit">
                    Register
                  </Button>

                  {/* Login Page Link */}
                  <p className="text-base font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-blue-600 hover:underline dark:text-primary-500">
                      Login here
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
  // Register Page UI end
}

export default Register;
