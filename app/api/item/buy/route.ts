import supabase from "@/app/utils/database";
import { NextResponse } from "next/server";

export const PUT = async (request: any) => {
  const req = await request.json();
  try {
    if (!req.itemId) {
      return NextResponse.json(
        { message: "アイテムIDが指定されていません" },
        { status: 400 }
      );
    }

    const { data: item, error: itemError } = await supabase
      .from("items")
      .select()
      .eq("id", req.itemId)
      .single();

    if (itemError) throw new Error(itemError.message);

    if (!item) {
      return NextResponse.json(
        { message: "アイテムが見つかりません" },
        { status: 404 }
      );
    }

    if (item.is_sold) {
      return NextResponse.json(
        { message: "このアイテムは既に購入されています" },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabase
      .from("items")
      .update({ is_sold: true })
      .eq("id", req.itemId);

    if (updateError) throw new Error(updateError.message);

    const { error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        item_id: req.itemId,
        buyer_email: req.email,
        seller_email: item.email,
        price: item.price,
        title: item.title,
        purchased_at: new Date().toISOString()
      });

    if (purchaseError) {
      console.error("購入履歴の保存に失敗しました:", purchaseError);
    }

    return NextResponse.json({ message: "購入が完了しました" });
  } catch (error: any) {
    return NextResponse.json(
      { message: `購入に失敗しました : ${error.message || error}` },
      { status: 500 }
    );
  }
}