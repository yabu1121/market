import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export const POST = async (request:any) => {
  const req = await request.json();
  try {
    const {data, error} = await supabase.from("users").select().eq("email",req.email).single();
    if(!error){
      if(req.password === data.password){
        const secretKey = new TextEncoder().encode("next-market-route-handlers");
        const payload = {
          email: req.email,
        } 
        const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime("1d").sign(secretKey);
        console.log(token);
        return NextResponse.json({message: "success log in",token: token});
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