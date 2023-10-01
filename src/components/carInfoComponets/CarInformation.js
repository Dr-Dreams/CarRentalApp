"use client";
import { Button, Col, DatePicker, Row, message } from "antd";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetLoading } from "@/redux/loadersSlice";
import StripeCheckout from "react-stripe-checkout";
import Image from "next/image";

const { RangePicker } = DatePicker;

function CarInformation({ car }) {
  const [isSlotAvailable, setIsSlotAvailable] = React.useState(false); // [1
  const [fromSlot, setFromSlot] = React.useState(null);
  const [toSlot, setToSlot] = React.useState(null);
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const bookNow = async (token) => {
    const payload = {
      car: car._id,
      user: currentUser._id,
      fromSlot,
      toSlot,
      totalHours: moment(toSlot).diff(moment(fromSlot), "hours"),
      totalAmount:
        moment(toSlot).diff(moment(fromSlot), "hours") * car?.rentPerHour,
      token: "done",
    };
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/bookings", payload);
      message.success("Booking added successfully");
      router.push("/profile");
    } catch (error) {
      console.log(error);
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.post("/api/checkAvailability", {
        car: car._id,
        fromSlot,
        toSlot,
      });
      if (response.data.success) {
        message.success("Slot Available");
        setIsSlotAvailable(true);
      } else {
        throw new Error("Slot Not Available");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    setIsSlotAvailable(false);
  }, [fromSlot, toSlot]);

  return (
    <div>
      <Row justify="center">
        <Col
          span={16}
          className="bg-gray-200  rounded-lg border-gray-700 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 border-2 flex flex-col p-5 gap-5  ">
          <h1 className="text-xl text-black dark:text-white font-semibold ">
            {car?.name}
          </h1>
          <div style={{ height: "75vh", overflow: "hidden" }}>
            <Image
              src={car.carImage}
              alt={car.carImage}
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
              width={500}
              height={500}
            />
          </div>

          <div className="flex flex-col gap-2 text-base text-black dark:text-white">
            <div className="flex justify-between">
              <span>
                <b>Brand</b>
              </span>
              <span>{car?.brand}</span>
            </div>

            <div className="flex justify-between">
              <span>
                <b>Fuel Type</b>
              </span>
              <span>{car?.fuelType}</span>
            </div>

            <div className="flex justify-between">
              <span>
                <b>Seating Capacity</b>
              </span>
              <span>{car?.seatingCapacity}</span>
            </div>

            <div className="flex justify-between">
              <span>
                <b>Rent Per Hour</b>
              </span>
              <span>₹{car?.rentPerHour}</span>
            </div>

            <div className="flex justify-center gap-5 items-center ">
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                onChange={(value) => {
                  setFromSlot(value[0].toDate());
                  setToSlot(value[1].toDate());
                }}
                disabledDate={(current) => {
                  return current && current < moment().endOf("day");
                }}
              />

              <Button
                type="button"
                className="inline-flex text-blac dark:text-white font-bold rounded-full items-center px-1 py-2 text-center bg-orange-300  hover:bg-orange-700 dark:bg-orange-300 dark:hover:bg-orange-700"
                disabled={!fromSlot || !toSlot}
                onClick={checkAvailability}>
                Check Availability
              </Button>
            </div>

            {fromSlot && toSlot && (
              <>
                <div className="flex justify-between items-center flex-col my-3">
                  <h1 className="text-xl font-semibold">
                    Total Hours :{" "}
                    {moment(toSlot).diff(moment(fromSlot), "hours")}
                  </h1>

                  <h1 className="text-xl font-semibold">
                    Total Amount : ₹{" "}
                    {moment(toSlot).diff(moment(fromSlot), "hours") *
                      car?.rentPerHour}
                  </h1>
                </div>
              </>
            )}

            <div className="flex justify-end gap-5 my-10">
              <Button
                type="button"
                className="text-black inline-flex dark:text-white text-base bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-full text-center mr-8 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  router.back();
                }}>
                Back
              </Button>

              {/* <StripeCheckout
                stripeKey="sk_test_51NwJi2SGCHT7b8NGXaA0nfHC5Gxh5O2jSN9KEbIFAUrwriEw0BTcCoWPKYzn9vW6xAF6hbWEtMOA9wkQmYetf1ck00x8a6YqJ8"
                token={bookNow}
                currency="INR"
                key={process.env.stripe_publishable_key}
                amount={
                  moment(toSlot).diff(moment(fromSlot), "hours") *
                  car?.rentPerHour *
                  100
                }
                shippingAddress>
              </StripeCheckout> */}
              <Button
                onClick={bookNow}
                type="button"
                className="text-base text-black dark:text-white inline-flex font-bold items-center rounded-full text-center bg-orange-300  hover:bg-orange-700 dark:bg-orange-300 dark:hover:bg-orange-700"
                title="Book Now"
                disabled={!fromSlot || !toSlot || !isSlotAvailable}>
                Book Now
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CarInformation;
