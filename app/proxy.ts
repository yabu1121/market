import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const proxy = async (request : any) => {
  // next() は処理が完了したということ。
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImV4cCI6MTc2MjQ0MjIxNH0.Zo9KE4UuTpBwhcYG6cae-LP_5jyPlAnyCDHN5T4xckA"
  // await request.headers.get("Authorization")?.split("   ")[1];
  if(!token)return NextResponse.json({message: "tokenがありません"});
  console.log("proxy");
  try {
    const secretKey = new TextEncoder().encode("next-market-route-handlers")
    const decodedJwt = await jwtVerify(token, secretKey);
    console.log(decodedJwt);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({message: "tokenが正しくありません。ログインしてください。"});
  }
}

export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
}