// POST Login, return JWT and redirect to /assets
import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import * as jose from "jose";
import User from "@/app/models/User";

// MONGOOSE
export default function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("🍃 Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
    });
}

// LOGIN
export async function POST(req) {
  connectDB();
  const { username, password } = await req.json();
  const user = await User.findOne({ name: username });
  const expiresIn = 60 * 15;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = await new jose.SignJWT({ username: username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h") // Set expiration time
    .sign(secret);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (
    username === user.username &&
    (await bcrypt.compare(password, user.password)) === false
  ) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  if (user.password !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json(
    {
      accessToken: jwt,
      user: username,
      expiresIn: expiresIn,
    },
    {
      headers: {
        "Set-Cookie": `accessToken=${jwt}; Max-Age=${expiresIn}; Path=/; HttpOnly`,
      },
    }
  );
}
