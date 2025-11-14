'use client'
import ConfirmBuyButton from "@/app/components/ConfirmBuyButton";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

interface ItemData {
  title: string;
  price: number;
  image: string;
  description: string;
}

const BuyPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<ItemData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/item/readsingle/${id}`);

        if (!res.ok)throw new Error('データの取得に失敗しました');
        const responseData = await res.json();
        setData(responseData.singleItem);

      } catch (error) {
        console.error(error);
        alert("失敗");
      } finally {
        setLoading(false);
      }
    }
    if(id) fetchItem()
  },[id]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!data) {
    return <div>アイテムが見つかりません。</div>;
  }

  return (
    <div>
      <p className="m-8">id: {id}</p>
      <div className="border rounded wrap-break-word w-100 items-center m-16 flex justify-between">
        <div className="w-100">
          <h1>title</h1>
          <p className="w-70 wrap-break-word">{data.title}</p>
        </div>
        <div>
          <Image
            src={data.image}
            alt={data.title}
            width={200}
            height={200}
            className="p-4 rounded"
          />
        </div>
      </div>

      <div className="border rounded wrap-break-word m-16">
        <h2>価格</h2>
        <p>{data.price}円</p>
      </div>

      <div className="border rounded wrap-break-word m-16">
        <h3>詳細</h3>
        <p>{data.description}</p>
      </div>
      <ConfirmBuyButton itemId={id} />
    </div>
  )
}

export default BuyPage

