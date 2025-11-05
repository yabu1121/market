import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";

export const POST = async (request :any) => {
  const req = await request.json();
  try {
    const {error} = await supabase.from("users").insert(req);
    if(error)throw new Error(error.message);
    return NextResponse.json({message: "success creating user"});
  } catch (error) {
    return NextResponse.json({message: `failed to creating user : ${error}`});
  }
}