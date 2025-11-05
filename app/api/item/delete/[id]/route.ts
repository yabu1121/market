import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";

export const DELETE = async (request :any, context : any) => {
  const req = await request.json();
  const params = await context.params;
  try {
    const {data, error} = await supabase.from("items").select().eq("id",params.id).single();
    if(error)throw new Error(error.message);
    if(data.email === req.email){
      const {error} = await supabase.from("items").delete().eq("id", params.id);
      if(error)throw new Error(error.message);
      return NextResponse.json({message: "delete item"});
    }else{
      return NextResponse.json({message: "ほかの人が作成したアイテムです"});
    }
  } catch (error) {
    return NextResponse.json({message: `falied to delete item :${error}`});
  }
}