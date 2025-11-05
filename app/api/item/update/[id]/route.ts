import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";

// 新しく情報を打ち込まれる場合はrequest, urlから参照がある場合はcontextを用いる。
export const PUT = async (request:any, context:any) => {
  try {
    const req = await request.json();
    const params = await context.params;
    const {data, error} = await supabase.from("items").update(req).eq("id",params.id);
    if(error)throw new Error(error.message);
    return NextResponse.json({message: "update item",getData: data});
  } catch (error) {
    return NextResponse.json({message: "failed to update item"});
  }
}