import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import bcrypt from "bcryptjs";

connectDB();

export async function PUT(request, { params }) {
  try {
    const userId = await validateTokenAndGetUserId(request);
    const reqBody = await request.json();

    if (reqBody.password != undefined) {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(reqBody.password, salt);
      reqBody.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(params.userid, reqBody, { new: true });
    return NextResponse.json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
