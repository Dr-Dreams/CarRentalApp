import Booking from "@/models/bookingModel";
import { connectDB } from "@/config/dbConfig";
import { NextResponse } from "next/server";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
const stripe = require("stripe")(process.env.stripe_secret_key);

connectDB();

export async function POST(request) {
  try {
    const userId = await validateTokenAndGetUserId(request);
    const reqBody = await request.json();

    // stripe payment starts

    // create customer
    // const customer = await stripe.customers.create({
    //   email: reqBody.email,
    //   source: reqBody.token.id,
    // });

    // create charge

    // const payment = await stripe.charges.create(
    //   {
    //     amount: reqBody.totalAmount * 100,
    //     currency: "inr",
    //     customer: customer.id,
    //     receipt_email: reqBody.email,
    //     description: `Booking for Bharat Car Rental`,
    //   },
    //   {
    //     idempotencyKey: reqBody.token.id,
    //   }
    // );
    // stripe payment end

    reqBody.paymentId = 100;

    await Booking.create(reqBody);
    return NextResponse.json({ message: "Booking added successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message, error },
      { status: 400 }
    );
  }
}

export async function GET(request) {
  try {
    await validateTokenAndGetUserId(request);
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    const filters = {};
    if (user) {
      filters.user = user;
    }
    const bookings = await Booking.find(filters)
      .populate("car")
      .populate("user");
    return NextResponse.json({ data: bookings });
  } catch (error) {
    return NextResponse.json(
      { message: error.message, error },
      { status: 400 }
    );
  }
}
