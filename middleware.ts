import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // Authorizationヘッダーからトークンを取得
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split(" ")[1]; // "Bearer <token>"の形式を想定
  
  if (!token) {
    return NextResponse.json({ 
        message: "tokenがありません", 
        status: 401 
      }
    );
  }

  try {
    const secretKey = new TextEncoder().encode("next-market-route-handlers");
    const decodedJwt = await jwtVerify(token, secretKey);
    console.log(decodedJwt);
    // トークンが有効な場合、リクエストを続行
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { message: "tokenが正しくありません。ログインしてください。" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};

