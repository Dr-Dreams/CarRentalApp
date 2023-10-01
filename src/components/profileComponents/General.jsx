import {
  confirmPasswordValidationRule,
  emailValidationRule,
  passwordValidationRule,
  textValidationRule,
} from "@/helpers/validationHelpers";
import { SetLoading } from "@/redux/loadersSlice";
import { SetCurrentUser } from "@/redux/usersSlice";
import { Button, Form, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function General() {
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));

      if (values.password === values.confirmPassword) {
        const response = await axios.put(
          `/api/users/${currentUser._id}`,
          values
        );
        dispatch(SetCurrentUser(response.data.data));
        message.success("Profile updated successfully");
      } else {
        message.error("Passwords do not match");
      }
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <div>
      <div className="w-[450px]">
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: currentUser.name,
            email: currentUser.email,
          }}>
          <div className="flex flex-col gap-5 text-black dark:text-white">
            <Form.Item
              label={
                <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                  Name
                </p>
              }
              name="name"
              rules={textValidationRule}>
              <input
                type="text"
                placeholder="John Doe"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>

            <Form.Item
              label={
                <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                  Email
                </p>
              }
              name="email"
              rules={emailValidationRule}>
              <input
                disabled
                type="email"
                placeholder="name@domain.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>

            <Form.Item
              label={
                <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                  Password
                </p>
              }
              hasFeedback
              rules={passwordValidationRule}
              name="password">
              <input
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>

            <Form.Item
              label={
                <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </p>
              }
              dependencies={["password"]}
              hasFeedback
              rules={confirmPasswordValidationRule}
              name="confirmPassword">
              <input
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>

            <Button
              type="button"
              block
              size="large"
              className="w-full text-white text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full  px-4 py-2  text-center mr-8 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              htmlType="submit">
              Update Profile
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default General;
