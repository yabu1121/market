import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";


export const GET = async (_ : any, context:any) => {
  try{
    // context.paramsでidを持ってこれる。
    const params = await context.params;
    console.log(params);
    const {data, error} = await supabase.from("items").select().eq("id", params.id).single();
    if(error)throw new Error(error.message);
    return NextResponse.json({message:"get single item", singleItem: data});
  }catch(error){
    return NextResponse.json({message:`failed to get single item : ${error}`});
  }
}