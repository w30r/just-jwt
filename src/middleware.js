import { bgRed } from "ansis";

export async function middleware() {
  console.log(bgRed("🍁 MIDDLEWARE!"));
}

export const config = {
  // matcher: ["/app/api/login/:path*"],
};
