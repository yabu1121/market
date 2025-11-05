import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";

export const DELETE = async (_, context : any) => {
  try {
    const params = await context.params;
    const {error} = await supabase.from("items").delete().eq("id", params.id);
    if(error)throw new Error(error.message);
    return NextResponse.json({message: "delete item"});
  } catch (error) {
    return NextResponse.json({message: "falied to delete item"});
  }
}