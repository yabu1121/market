import { NextResponse } from "next/server";
import "../../../utils/database"
import supabase from "../../../utils/database";

export const POST = async (request : any) => {
  const req = await request.json();
  try {
    // supabaseを使って.from(参照テーブル).insert(入れたいデータ)
    const { error } = await supabase.from("items").insert(req);
    if(error) throw new Error(error.message);
    return NextResponse.json({message: "create item"});
  } catch(error) {
    return NextResponse.json({message: `failed to create item : ${error}`});
  }
}