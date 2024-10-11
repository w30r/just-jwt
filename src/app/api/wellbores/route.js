import Wellbore from "@/app/models/Wellbore";
import { NextResponse } from "next/server";
import connectDB from "../login/route";
import * as jose from "jose";

export async function GET(request) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = request.cookies.get("accessToken");
  if (!jwt) {
    return NextResponse.json(
      { error: "No access token, unauthorized." },
      { status: 401 }
    );
  }

  const natang = await jose.jwtVerify(jwt.value, secret);
  if (!natang.payload.username) {
    return NextResponse.json(
      { error: "Something went wrong with ur token..." },
      { status: 401 }
    );
  }

  connectDB();
  const wellbores = await Wellbore.find();
  return NextResponse.json({ payload: natang.payload, data: wellbores });
}
