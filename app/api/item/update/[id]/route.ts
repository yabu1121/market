import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";

// 新しく情報を打ち込まれる場合はrequest, urlから参照がある場合はcontextを用いる。
export const PUT = async (request: any, context: any) => {
  const req = await request.json();
  const params = await context.params;
  try {
    const { data, error } = await supabase.from("items").select().eq("id", params.id).single();
    if (error) throw new Error(error.message);
    if (data.email === req.email) {
      const { email, ...updateData } = req;
      const { error: updateError } = await supabase.from("items").update(updateData).eq("id", params.id);
      if (updateError) throw new Error(updateError.message);
      return NextResponse.json({ message: "update item" });
    } else {
      return NextResponse.json(
        { message: "ほかの人が作成したアイテムです" },
        { status: 403 }
      )
    }
  } catch (error: any) {
    return NextResponse.json({ message: `編集失敗 : ${error.message || error}` })
  }
}
