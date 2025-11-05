import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";

export const POST = async (request:any) => {
  const req = await request.json();
  try {
    const {data, error} = await supabase.from("users").select().eq("email",req.email).single();
    if(!error){
      if(req.password === data.password){
        return NextResponse.json({message: "success log in"});
      }else{
        return NextResponse.json({message: "wrong"});
      }
    } else{
      return NextResponse.json({message: "failed to log in : please register user"});
    }
  } catch (error) {
    return NextResponse.json({message: `failed to get user : ${error}`});
  }
}