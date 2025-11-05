import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";

export const GET = async (_ : any, __ :any) => {
  try{
    // supabase.from("items").select <= selectですべて読み取れる。
    const {data, error} = await supabase.from("items").select();
    if(error)throw new Error(error.message);
    // ここのallItemsとかmessageはどんな文字列でも大丈夫。jsonにひょうじしたいものを記述する。
    return NextResponse.json({message : "get all item" , allItems: data});

  }catch(error){
    return NextResponse.json({message : `failed to get all item : ${error}`});
  }
}