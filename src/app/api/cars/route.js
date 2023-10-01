import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";
connectDB();

// Adding new Car method
export async function POST(request) {
  try {
    const userId = await validateTokenAndGetUserId(request);  // validating user
    const reqBody = await request.json();
    reqBody.addedBy = userId;
    const car = await Car.create(reqBody);
    return NextResponse.json({ message: "Car added successfully", car });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// Getting all cars details method
export async function GET(request) {
  try {
    const userId = await validateTokenAndGetUserId(request);  // validating user
    const cars = await Car.find();
    return NextResponse.json({ data: cars });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
