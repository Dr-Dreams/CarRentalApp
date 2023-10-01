import {
  textValidationRule,
  validationRule,
} from "@/helpers/validationHelpers";
import { SetLoading } from "@/redux/loadersSlice";
import { Col, Form, Modal, Row, message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

function CarForm({
  showCarFormModal,
  setShowCarFormModal,
  reloadData,
  selectedCar,
}) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      let response = null;

      if (selectedCar) {
        values._id = selectedCar._id;
        response = await axios.put(`/api/cars/${selectedCar._id}`, values);
      } else {
        response = await axios.post("/api/cars", values);
      }
      reloadData();
      message.success(response.data.message);
      setShowCarFormModal(false);
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <Modal
      width={800}
      open={showCarFormModal}
      onCancel={() => setShowCarFormModal(false)}
      centered
      okText="Save"
      onOk={() => {
        form.submit();
      }}>
      <h1 className="text-center text-xl mb-3 uppercase">
        {selectedCar ? "Edit Car" : "Add Car"}
      </h1>

      <Form
        layout="vertical"
        className="flex flex-col gap-5 mb-3"
        onFinish={onFinish}
        form={form}
        initialValues={selectedCar}>
        <Form.Item
          label={
            <p className="block mb-2 text-base font-semibold text-gray-900 ">
              Name
            </p>
          }
          name="name"
          rules={textValidationRule}>
          <input
            type="text"
            className=" border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
          />
        </Form.Item>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label={
                <p className="block mb-2 text-base font-semibold text-gray-900 ">
                  Brand
                </p>
              }
              name="brand"
              rules={textValidationRule}>
              <input
                type="text"
                className=" border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={
                <p className="block mb-2 text-base font-semibold text-gray-900">
                  Fuel Type
                </p>
              }
              name="fuelType"
              rules={validationRule}>
              <select className="bg-white border dark:border-gray-300 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5">
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label={
                <p className="block mb-2 text-base font-semibold text-gray-900 ">
                  Rent Per Hour
                </p>
              }
              name="rentPerHour"
              rules={validationRule}>
              <input
                type="number"
                className=" border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={
                <p className="block mb-2 text-base font-semibold text-gray-900">
                  Seating Capacity
                </p>
              }
              name="seatingCapacity"
              rules={validationRule}>
              <input
                type="number"
                className="border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={
            <p className="block mb-2 text-base font-semibold text-gray-900 ">
              Car Image Url
            </p>
          }
          name="carImage"
          rules={textValidationRule}>
          <input
            type="text"
            className="border w-full border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CarForm;
