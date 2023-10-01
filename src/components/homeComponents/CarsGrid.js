"use client";
import { Col, Row } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import Card from "antd/es/card/Card";

function CarsGrid({ cars }) {
  const router = useRouter();
  return (
    <Row gutter={[16, 16]}>
      {cars.map((car) => (
        <Col span={6} className="text-xl">
          <div>
            <Card
              style={{
                width: "100%",
                height: "100%",
              }}
              className="block w-max bg-gray-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img
                  alt={car.carImage}
                  src={car.carImage}
                  style={{ width: "100%", height: "100%", objectFit: "fill" }}
                />
              </div>
              <div className="text-black dark:text-white text-md mt-2 mb-[-16px]">
                <p>{car.name} </p>
                <p> Fuel Type - {car.fuelType}</p>
                <p> Price - {car.rentPerHour}/Hour</p>
                <p> Maximum Capacity - {car.seatingCapacity} Members</p>
                <button
                  onClick={() => {
                    router.push(`/cars/${car._id}`);
                  }}
                  className="inline-flex items-center px-1 py-2  text-center bg-orange-300 rounded-lg hover:bg-orange-700 dark:bg-orange-300 dark:hover:bg-orange-700 ">
                  Book Now
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </Card>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default CarsGrid;

{
  /* <div
  className="card cursor-pointer"
  onClick={() => router.push(`/cars/${car._id}`)}
>
  <img src={car.carImage} alt={car.carImage} height="300" width="100%" />

  <div className="py-3 px-2">
    <h1 className="text-md">
      {car.name}
    </h1>
    <h1 className="text-md"> Fuel Type - {car.fuelType}</h1>
    <h1 className="text-md"> Price - {car.rentPerHour}/Hour</h1>
    <h1 className="text-md"> Maximum Capacity - {car.seatingCapacity} Members</h1>
  </div>
</div> */
}
